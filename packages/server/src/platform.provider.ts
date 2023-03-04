import { Fn, IPlatformProvider } from '@vxjs-fivem/core';

export class PlatformProvider implements IPlatformProvider {
  public onExport(name: string, handler: Fn): void {
    global.exports(name, handler);
  }
  public onChatCommand(name: string, handler: Fn, isRestricted: boolean): void {
    RegisterCommand(name, handler, isRestricted);
  }
  public onNetEvent(name: string, handler: Fn): void {
    onNet(name, handler);
  }
  public onLocalEvent(name: string, handler: Fn): void {
    on(name, handler);
  }
}
