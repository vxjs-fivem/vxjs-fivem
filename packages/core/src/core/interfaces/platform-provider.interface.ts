import { Fn } from '../../types';

export interface IPlatformProvider {
  onExport(name: string, handler: Fn): void;

  getExport(resource: string): Record<string, Fn>;

  getExport(resource: string, name: string): Fn;

  onChatCommand(name: string, handler: Fn, isRestricted: boolean): void;

  onNetEvent(name: string, handler: Fn): void;

  onLocalEvent(name: string, handler: Fn): void;

  loadFile(name: string): string;

  readonly side: 'client' | 'server';
}
