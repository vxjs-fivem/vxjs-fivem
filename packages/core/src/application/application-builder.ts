import {
  Factory,
  Fn,
  IApplication,
  IApplicationBuilder,
  IAsyncModule,
  IBinder,
  IDynamicModule,
  IModule,
  IServiceProvider,
  ProviderType,
  TypeOf
} from '../types';
import { ServiceCollection } from '../container';
import { Reflector } from '../metadata';
import { CoreMetadata } from './const';
import {
  BINDER,
  CONFIG,
  CONTROLLER, EXPORT, GLOBAL_REQUEST_FILTER, GLOBAL_RESPONSE_FILTER,
  IConfigService,
  ILogger,
  IPlatformProvider,
  IResourceEventProvider,
  LOGGER,
  PLATFORM_PROVIDER, REQUEST_FILTER,
  RESOURCE_EVENT_PROVIDER, RESPONSE_FILTER
} from '../core';
import { ConfigService } from './config.service';
import { ConsoleLogger } from './logging.factory';
import EventEmitter2 from 'eventemitter2';
import { ExportBinder, LocalEventBinder, ResourceEventBinder } from '../binders';
import { ExceptionResponseFilter, IRequestFilter, IResponseFilter } from '../flow';
import { HandlerBuilder } from '../flow/handler-builder';
import { GuardRequestFilter } from '../flow/filters/guard.request-filter';

class FivemPlatformProvider implements IPlatformProvider {
  public readonly side = IsDuplicityVersion() ? 'server' : 'client';

  public onChatCommand(name: string, handler: Fn, isRestricted: boolean): void {
    global.RegisterCommand(name, handler, isRestricted);
  }

  public onExport(name: string, handler: Fn): void {
    global.exports(name, handler);
  }

  public onLocalEvent(name: string, handler: Fn): void {
    global.on(name, handler);
  }

  public onNetEvent(name: string, handler: Fn): void {
    global.onNet(name, handler);
  }

  public getExport(resource: string): Record<string, Fn>;
  public getExport(resource: string, name: string): Fn;
  public getExport(resource: string, name?: string): Record<string, Fn> | Fn {
    if (name) {
      return global.exports[resource][name] as Fn;
    }
    return global.exports[resource] as Record<string, Fn>;
  }

  public loadFile(name: string): string {
    const resourceName = GetCurrentResourceName();
    return LoadResourceFile(resourceName, name);
  }
}

class Application implements IApplication {
  private readonly _provider: IServiceProvider;
  private readonly _logger: ILogger;

  public constructor(provider: IServiceProvider, logger: ILogger) {
    this._provider = provider;
    this._logger = logger;
  }

  public get provider(): IServiceProvider {
    return this._provider;
  }

  public getLoggerFor<T>(type: TypeOf<T> | string): ILogger {
    return this.provider.get<ILogger>(LOGGER, {
      metadata: {
        name: typeof type === 'string' ? type : undefined,
      },
      target: typeof type === 'string' ? undefined : type,
      property: ''
    });
  }

  public start(): void {
    const controllers = this._provider.getAll(CONTROLLER);

    if (controllers.length === 0) {
      throw new Error('Could not start the app. No controllers were found.');
    }

    const binders = this._provider.getAll<IBinder>(BINDER);

    controllers.forEach((controller) => binders.forEach((binder) => binder.bind(controller)));
    this._logger.info('Application successfully started');
  }
}

class ApplicationBuilder implements IApplicationBuilder {
  private readonly _modules: Set<IModule> = new Set<IModule>();
  private _controllers: Set<ProviderType<unknown>> = new Set<ProviderType<unknown>>();
  private _binders: Set<ProviderType<IBinder>> = new Set<ProviderType<IBinder>>();
  private _loggingFactory: Factory<ILogger>;
  public readonly platform: IPlatformProvider;
  public readonly config: IConfigService;
  public readonly services = new ServiceCollection();

  public constructor(platform: IPlatformProvider) {
    this.platform = platform;
    const configFileName = `configs/${platform.side}/vx.config.json`;

    this.config = new ConfigService(JSON.parse(platform.loadFile(configFileName)));

  }

  public setLoggingFactory(factory: Factory<ILogger>): IApplicationBuilder {
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

  public async build(): Promise<IApplication> {

    this.services.addFactory(CONFIG, (provider, metadata) => {
      if (metadata.metadata.configPath) {
        return this.config.getOrThrow(metadata.metadata.configPath as string);
      }
      return this.config;
    });

    this.services.addFactory(EXPORT, (provider, metadata) => {
      const resource = metadata.metadata.resource as string;
      const method = metadata.metadata.method as string;
      return this.platform.getExport(resource, method);
    });

    this.services.add<IResourceEventProvider>(RESOURCE_EVENT_PROVIDER, new EventEmitter2());
    this.addBinder(LocalEventBinder);
    this.addBinder(ExportBinder);
    this.addBinder(ResourceEventBinder);
    
    const [ dynamicModules, asyncModules ] = this.getModules();

    dynamicModules.forEach((x) => {
      x.load(this);
    });

    const isDebug = this.config.getOrDefault('logging.debug', true);
    this._loggingFactory ??= (provider, metadata): ILogger => {
      const name = (metadata.metadata.name ?? metadata.target?.name ?? '') as string;

      return new ConsoleLogger(name, this.platform.side, isDebug);
    };

    this.services.addFactory<ILogger>(LOGGER, this._loggingFactory);
    this.services.add<IPlatformProvider>(PLATFORM_PROVIDER, this.platform);
    this.services.add<HandlerBuilder>(HandlerBuilder, HandlerBuilder);

    this.addGlobalResponseFilter(ExceptionResponseFilter);
    this.addGlobalRequestFilter(GuardRequestFilter);

    const provider = this.services.build();

    const app = new Application(provider, this._loggingFactory(provider, {
      target: Application,
      property: '_logger',
      metadata: {}
    }));

    for (const asyncModule of asyncModules) {
      await asyncModule.loadAsync(this, provider);
    }

    this._controllers.forEach((x) => this.services.add(CONTROLLER, x));
    this._binders.forEach((x) => this.services.add(BINDER, x));

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

    return [ dynamicModules, asyncModules ];
  }

  public addRequestFilter(filter: ProviderType<IRequestFilter>): IApplicationBuilder {
    this.services.add(REQUEST_FILTER, filter);
    return this;
  }

  public addGlobalRequestFilter(filter: ProviderType<IRequestFilter>): IApplicationBuilder {
    this.services.add(GLOBAL_REQUEST_FILTER, filter);
    return this;
  }

  public addResponseFilter(filter: ProviderType<IResponseFilter>): IApplicationBuilder {
    this.services.add(RESPONSE_FILTER, filter);
    return this;
  }

  public addGlobalResponseFilter(filter: ProviderType<IResponseFilter>): IApplicationBuilder {
    this.services.add(GLOBAL_RESPONSE_FILTER, filter);
    return this;
  }
}

export abstract class ApplicationFactory {
  public static createBuilder(provider: IPlatformProvider = new FivemPlatformProvider()): IApplicationBuilder {
    return new ApplicationBuilder(provider);
  }
}
