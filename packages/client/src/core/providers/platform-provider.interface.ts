import { Fn } from '@vxjs-fivem/core';

export type ChatMessageOptions = {
  message: string,
  emitter: string,
  color?: [red: number, green: number, blue: number],
  multiline?: boolean,
}

export interface IPlatformProvider {
  on(event: string, handler: Fn): void;
  emit(event: string, ...payload: unknown[]): void;
  onNet(event: string, handler: Fn): void;
  emitNet(event: string, ...payload: unknown[]): void;
  onChat(command: string, handler: Fn, isRestricted: boolean): void;
  emitChat(message: ChatMessageOptions): void;
  onExport(name: string, handler: Fn): void;
  callExport<T = undefined>(resource: string, name: string, ...payload: unknown[]): T
}