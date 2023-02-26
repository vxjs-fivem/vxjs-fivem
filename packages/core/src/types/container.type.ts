import { Factory, ProviderType } from './common';

export interface IServiceCollection {
  add<T>(key: unknown, target: ProviderType<T>): IServiceCollection;
  addFactory<T>(key: unknown, factory: Factory<T>): IServiceCollection;
  remove(key: string): IServiceCollection;
  has(key: string): boolean;
  build(): IServiceProvider;
}

export interface IServiceProvider {
  get<T>(key: string): T;
  getAll<T>(key: string): T[];
  has(key: string): boolean;
}
