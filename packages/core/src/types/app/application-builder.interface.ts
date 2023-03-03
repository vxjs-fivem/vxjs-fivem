import { IApplication } from './application.interface';
import { IModule } from '../module.interface';
import { IServiceCollection } from '../container.type';
import { ProviderType } from '../common';
import { IBinder } from './binder.interface';
import { IConfigService, ILoggingFactory, IPlatformProvider } from '../../core';

export interface IApplicationBuilder {
  readonly services: IServiceCollection;
  readonly config: IConfigService;
  readonly side: 'CLIENT' | 'SERVER';
  readonly resourceName: string;
  readonly platformProvider: IPlatformProvider;
  addController<T>(controller: ProviderType<T>): IApplicationBuilder;
  removeController<T>(controller: ProviderType<T>): IApplicationBuilder;
  addBinder(binder: ProviderType<IBinder>): IApplicationBuilder;
  removeBinder(binder: ProviderType<IBinder>): IApplicationBuilder;
  addModule(module: IModule): IApplicationBuilder;
  removeModule(module: IModule): IApplicationBuilder;
  setLoggingFactory(factory: ILoggingFactory): IApplicationBuilder;
  build(): IApplication;
}
