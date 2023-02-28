import { Fn } from '@vxjs-fivem/core';
import { IPlatformProvider } from '../core';

export class FivemClientProvider implements IPlatformProvider {
  public on(event: string, handler: Fn): void {
    global.on(event, handler);
  }

  public emit(event: string, ...payload: unknown[]): void {
    global.emit(event, ...payload);
  }

  public onNet(event: string, handler: Fn): void {
    global.onNet(event, handler);
  }

  public emitNet(event: string, ...payload: unknown[]): void {
    global.emitNet(event, ...payload);
  }

  public onChat(event: string, handler: Fn, isRestricted: boolean): void {
    global.RegisterCommand(event, handler, isRestricted);
  }

  public export(name: string, handler: Fn): void {
    global.exports(name, handler);
  }
}