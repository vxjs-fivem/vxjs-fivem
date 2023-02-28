import { Fn } from '@vxjs-fivem/core';

export interface IPlatformProvider {
  on(event: string, handler: Fn): void;

  emit(event: string, ...payload: unknown[]): void;

  onNet(event: string, handler: Fn): void;

  emitNet(event: string, ...payload: unknown[]): void;

  onChat(event: string, handler: Fn, isRestricted: boolean): void;

  export(name: string, handler: Fn): void;
}