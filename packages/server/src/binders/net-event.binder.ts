import { Inject, InjectMany, IPlatformProvider, NetEvent, Optional, PLATFORM_PROVIDER } from '@vxjs-fivem/core';
import { BaseGuardedBinder } from './base.guarded-binder';
import { IGuard, IExceptionBoundary, NetContext, NetContextKind } from '../flow';
import { EXCEPTION_BOUNDARY, GUARD_PROVIDER } from '../core';
import { Player } from '../natives';

export class NetEventBinder extends BaseGuardedBinder {
  @Inject(PLATFORM_PROVIDER)
  private readonly provider: IPlatformProvider;
  public constructor(
    @Optional() @InjectMany(GUARD_PROVIDER) guards: IGuard[] = [],
    @Inject(EXCEPTION_BOUNDARY) handler: IExceptionBoundary
  ) {
    super(guards, handler);
  }

  public bind(controller: unknown): void {
    const metadata = NetEvent.getMetadata(controller);
    metadata.forEach(({ method, value: { name } }) => {
      const handler = this.createWrapper(controller, method);
      this.provider.onNetEvent(name, (...args) => {
        const context = Object.assign(new NetContext(), {
          eventName: name,
          kind: NetContextKind.NetEvent,
          args: args,
          player: new Player(global.source),
          target: controller,
          methodName: method,
        });
        return handler(context);
      });
    });
  }
}
