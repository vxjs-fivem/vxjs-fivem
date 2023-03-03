import { Fn } from '../../types';

export interface IPlatformProvider {
  onExport(name: string, handler: Fn): void;
  onChatCommand(name: string, handler: Fn, isRestricted: boolean): void;
  onNetEvent(name: string, handler: Fn): void;
  onLocalEvent(name: string, handler: Fn): void;
}
