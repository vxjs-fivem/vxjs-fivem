import { IServiceProvider } from './container.type';

export type TypeOf<T> = new (...args: unknown[]) => T;
export type ProviderType<T> = TypeOf<T> | T;
export type Fn = (...args: unknown[]) => unknown;
export type Factory<T> = (provider: IServiceProvider, target: TypeOf<unknown>) => T;
