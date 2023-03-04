import { ValueOf } from '@vxjs-fivem/core';
import { NetContextKind } from './net-context.kind';
import { Player } from '../../natives';

export class NetContext {
  public readonly eventName: string;
  public readonly kind: ValueOf<typeof NetContextKind>;
  public readonly args: unknown[];
  public readonly player: Player;
  public readonly target: unknown;
  public readonly methodName: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [p: string]: any;
}
