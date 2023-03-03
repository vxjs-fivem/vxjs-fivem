import { Fn } from '../../types';

export interface IResourceEventProvider {
  on(name: string, handler: Fn): void;
  once(name: string, handler: Fn): void;
  off(name: string, handler: Fn): void;
  emit(name: string, ...payload: unknown[]): void;
  emitAsync(name: string, ...payload: unknown[]): Promise<unknown[]>;
}
