import { IServiceProvider } from './container.type';

export type FactoryMetadata = {
  target: TypeOf<unknown>,
  property: string
  metadata: {[key: string]: unknown}
}

export type TypeOf<T> = (new (...args: unknown[]) => T);
export type ProviderType<T> = TypeOf<T> | T;
export type Fn = (...args: unknown[]) => unknown;
export type Factory<T> = (provider: IServiceProvider, metadata: FactoryMetadata) => T;
export type ValueOf<T> = T[keyof T];
