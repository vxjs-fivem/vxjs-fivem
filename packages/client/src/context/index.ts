import { Fn } from '@vxjs-fivem/core';

export type EventContext = {
  target: unknown;
  handler: Fn;
  kind: 'nui' | 'chat';
  invoker: string,
  passedArguments: unknown[];
  transformedArguments: unknown[];
};
