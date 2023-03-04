import { ValueOf } from '@vxjs-fivem/core';

export const NetContextKind = {
  NetEvent: Symbol('NET_EVENT'),
  ChatCommand: Symbol('CHAT_COMMAND'),
  RemoteRequest: Symbol('REMOTE_REQUEST'),
} as const;

export type TNetContextKind = ValueOf<typeof NetContextKind>;
