import { ValueOf } from '@vxjs-fivem/core';

export const NetContextKind = {
  NetEvent: Symbol('NET_EVENT'),
  ChatCommand: Symbol('CHAT_COMMAND'),
  RemoteRequest: Symbol('CHAT_COMMAND'),
} as const;

export class NetContext {
  public invoker: string;
  public kind: ValueOf<typeof NetContextKind>;
}

const c = new NetContext();
