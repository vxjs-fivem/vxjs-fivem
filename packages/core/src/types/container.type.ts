import { Factory, ProviderType, TypeOf } from './common';

export type ContainerKeyType = string | symbol | TypeOf<unknown>;

export interface IServiceCollection {
  add<T>(key: ContainerKeyType, target: ProviderType<T>): IServiceCollection;
  addFactory<T>(key: ContainerKeyType, factory: Factory<T>): IServiceCollection;
  remove(key: ContainerKeyType): IServiceCollection;
  has(key: ContainerKeyType): boolean;
  build(): IServiceProvider;
}

export interface IServiceProvider {
  get<T>(key: ContainerKeyType): T;
  getAll<T>(key: ContainerKeyType): T[];
  has(key: ContainerKeyType): boolean;
}
