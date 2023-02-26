import { IApplicationBuilder } from './app';
import { IServiceProvider } from './container.type';

export interface IDynamicModule {
  load(builder: IApplicationBuilder): void;
}

export interface IAsyncModule {
  loadAsync(builder: IApplicationBuilder, provider: IServiceProvider): Promise<void>;
}

export type IModule = IDynamicModule | IAsyncModule;
