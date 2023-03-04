import { ChatCommand, Inject, InjectMany, IPlatformProvider, Optional, PLATFORM_PROVIDER } from '@vxjs-fivem/core';
import { BaseGuardedBinder } from './base.guarded-binder';
import { IGuard, NetContext, NetContextKind, IExceptionBoundary } from '../flow';
import { EXCEPTION_BOUNDARY, GUARD_PROVIDER } from '../core';
import { Player } from '../natives';

export class ChatCommandBinder extends BaseGuardedBinder {
  @Inject(PLATFORM_PROVIDER)
  private readonly provider: IPlatformProvider;
  public constructor(
    @Optional() @InjectMany(GUARD_PROVIDER) guards: IGuard[] = [],
    @Inject(EXCEPTION_BOUNDARY) handler: IExceptionBoundary
  ) {
    super(guards, handler);
  }

  public bind(controller: unknown): void {
    const metadata = ChatCommand.getMetadata(controller);
    metadata.forEach(({ method, value: { name, isRestricted } }) => {
      const handler = this.createWrapper(controller, method);
      this.provider.onChatCommand(
        name,
        (src: number, args: string[]) => {
          const context = Object.assign(new NetContext(), {
            eventName: name,
            kind: NetContextKind.ChatCommand,
            args: args,
            player: src === 0 ? null : new Player(src),
            target: controller,
            methodName: method,
          });
          return handler(context);
        },
        isRestricted
      );
    });
  }
}
