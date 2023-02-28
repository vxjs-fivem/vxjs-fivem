import { Fn } from '@vxjs-fivem/core';

export interface IRpcProvider {
  on(name: string, handler: Fn): void
  emit(name: string, handler: Fn): void
  emitAsync<T>(name: string, handler: Fn): Promise<T>
}