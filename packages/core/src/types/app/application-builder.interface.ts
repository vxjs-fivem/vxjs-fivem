import { IApplication } from './application.interface';
import { IModule } from '../module.interface';
import { IServiceCollection } from '../container.type';
import { Factory, ProviderType, TypeOf } from '../common';
import { IBinder } from './binder.interface';
import { IConfigService, ILogger, IPlatformProvider } from '../../core';
import { IRequestFilter, IResponseFilter } from '../../flow';

export interface IApplicationBuilder {
  readonly services: IServiceCollection;
  readonly config: IConfigService;
  readonly platform: IPlatformProvider;

  addController<T>(controller: ProviderType<T>): IApplicationBuilder;

  removeController<T>(controller: ProviderType<T>): IApplicationBuilder;

  addBinder(binder: ProviderType<IBinder>): IApplicationBuilder;

  removeBinder(binder: ProviderType<IBinder>): IApplicationBuilder;

  addModule(module: IModule): IApplicationBuilder;

  removeModule(module: IModule): IApplicationBuilder;

  setLoggingFactory(factory: Factory<ILogger>): IApplicationBuilder;

  addRequestFilter(filter: ProviderType<IRequestFilter>): IApplicationBuilder;
  addGlobalRequestFilter(filter: ProviderType<IRequestFilter>): IApplicationBuilder;
  addResponseFilter(filter: ProviderType<IResponseFilter>): IApplicationBuilder;
  addGlobalResponseFilter(filter: ProviderType<IResponseFilter>): IApplicationBuilder;

  build(): Promise<IApplication>;
}
