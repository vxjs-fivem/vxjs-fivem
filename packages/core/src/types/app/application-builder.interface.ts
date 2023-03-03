import { IApplication } from './application.interface';
import { IModule } from '../module.interface';
import { IServiceCollection } from '../container.type';
import { ProviderType } from '../common';
import { IBinder } from './binder.interface';
import { IConfigService, ILoggingFactory } from '../../core';

export interface IApplicationBuilder {
  services: IServiceCollection;
  config: IConfigService;
  addController<T>(controller: ProviderType<T>): IApplicationBuilder;
  removeController<T>(controller: ProviderType<T>): IApplicationBuilder;
  addBinder(binder: ProviderType<IBinder>): IApplicationBuilder;
  removeBinder(binder: ProviderType<IBinder>): IApplicationBuilder;
  addModule(module: IModule): IApplicationBuilder;
  removeModule(module: IModule): IApplicationBuilder;
  setLoggingFactory(factory: ILoggingFactory): IApplicationBuilder;
  build(): IApplication;
}
