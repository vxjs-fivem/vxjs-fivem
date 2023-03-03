import {
  Fn,
  IApplication,
  IApplicationBuilder,
  IAsyncModule,
  IBinder,
  IDynamicModule,
  IModule,
  IServiceProvider,
  ProviderType,
} from '../types';
import { ServiceCollection } from '../container';
import { Reflector } from '../metadata';
import { CoreMetadata } from './const';
import {
  CONFIG_SERVICE,
  IConfigService,
  ILogger,
  ILoggingFactory,
  IPlatformProvider,
  IResourceEventProvider,
  LOGGER,
  PLATFORM_PROVIDER,
  RESOURCE_EVENT_PROVIDER,
} from '../core';
import { ConfigService } from './config.service';
import { LoggingFactory } from './logging.factory';
import EventEmitter2 from 'eventemitter2';
import { ExportBinder, LocalEventBinder, ResourceEventBinder } from '../binders';

const CONTROLLER_TAG = '00a54152-d339-490c-8122-ac4e73c513fb';
const BINDER_TAG = '8e90de0d-6929-4b04-85ba-338d50d45605';

class Application implements IApplication {
  private readonly _provider: IServiceProvider;
  private _beforeStartCallbacks: Fn[] = [];

  public constructor(provider: IServiceProvider) {
    this._provider = provider;
  }

  public get provider(): IServiceProvider {
    return this._provider;
  }

  public async start(): Promise<void> {
    for (const cb of this._beforeStartCallbacks) {
      await cb();
    }

    const controllers = this._provider.getAll(CONTROLLER_TAG);

    if (controllers.length === 0) {
      throw new Error('Could not start the app. No controllers were found.');
    }

    const binders = this._provider.getAll<IBinder>(BINDER_TAG);

    controllers.forEach((controller) => binders.forEach((binder) => binder.bind(controller)));
  }

  public beforeStart(fn: Fn): void {
    this._beforeStartCallbacks.push(fn);
  }
}

export class ApplicationBuilder implements IApplicationBuilder {
  private readonly _modules: Set<IModule> = new Set<IModule>();
  private _controllers: Set<ProviderType<unknown>> = new Set<ProviderType<unknown>>();
  private _binders: Set<ProviderType<IBinder>> = new Set<ProviderType<IBinder>>();
  private _loggingFactory: ILoggingFactory;
  public readonly config: IConfigService;
  public readonly services = new ServiceCollection();
  public readonly side: 'CLIENT' | 'SERVER';
  public readonly resourceName: string;
  public readonly platformProvider: IPlatformProvider;

  public constructor(platformProvider: IPlatformProvider) {
    this.side = IsDuplicityVersion() ? 'SERVER' : 'CLIENT';
    const configFileName = `vx.config.${this.side.toLowerCase()}.json`;
    this.resourceName = GetCurrentResourceName();
    const content = JSON.parse(LoadResourceFile(this.resourceName, configFileName) ?? null) ?? {};
    this.config = new ConfigService(content);
    this.services.add<IConfigService>(CONFIG_SERVICE, this.config);
    this.platformProvider = platformProvider;
    this.services.add<IPlatformProvider>(PLATFORM_PROVIDER, this.platformProvider);
    this.services.add<IResourceEventProvider>(RESOURCE_EVENT_PROVIDER, new EventEmitter2());
    this.addBinder(LocalEventBinder);
    this.addBinder(ExportBinder);
    this.addBinder(ResourceEventBinder);
  }

  public setLoggingFactory(factory: ILoggingFactory): IApplicationBuilder {
    this._loggingFactory = factory;
    return this;
  }

  public removeModule(module: IModule): IApplicationBuilder {
    this._modules.delete(module);
    return this;
  }

  public addModule(module: IModule): IApplicationBuilder {
    this._modules.add(module);
    return this;
  }

  public addBinder(binder: ProviderType<IBinder>): IApplicationBuilder {
    this._binders.add(binder);
    return this;
  }

  public removeBinder(binder: ProviderType<IBinder>): IApplicationBuilder {
    this._binders.delete(binder);
    return this;
  }

  public addController<T>(controller: ProviderType<T>): IApplicationBuilder {
    const constructor = Reflector.getClass(controller);
    if (!Reflect.hasMetadata(CoreMetadata.Controller, constructor)) {
      throw new Error(`Cannot register controller ${constructor.name}. Missing @Controller() decorator`);
    }
    this._controllers.add(controller);
    return this;
  }

  public removeController<T>(controller: ProviderType<T>): IApplicationBuilder {
    this._controllers.delete(controller);
    return this;
  }

  public build(): IApplication {
    const [dynamicModules, asyncModules] = this.getModules();

    dynamicModules.forEach((x) => {
      x.load(this);
    });

    this._loggingFactory ??= new LoggingFactory();
    this.services.addFactory<ILogger>(LOGGER, (provider, target) => {
      return this._loggingFactory.createLogger(provider, target);
    });

    const provider = this.services.build();

    const app = new Application(provider);

    app.beforeStart(async () => {
      for (const asyncModule of asyncModules) {
        await asyncModule.loadAsync(this, provider);
      }
      this._controllers.forEach((x) => this.services.add(CONTROLLER_TAG, x));
      this._binders.forEach((x) => this.services.add(BINDER_TAG, x));
    });

    return app;
  }

  private getModules(): [IDynamicModule[], IAsyncModule[]] {
    const dynamicModules: IDynamicModule[] = [];
    const asyncModules: IAsyncModule[] = [];

    this._modules.forEach((module) => {
      if ('load' in module) {
        dynamicModules.push(module);
      }

      if ('loadAsync' in module) {
        asyncModules.push(module);
      }
    });

    return [dynamicModules, asyncModules];
  }
}
