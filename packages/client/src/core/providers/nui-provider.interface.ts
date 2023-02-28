import { Fn } from '@vxjs-fivem/core';

export interface INuiProvider {
  on(name: string, handler: Fn): void
  emit<T>(name: string, payload: T): void
}