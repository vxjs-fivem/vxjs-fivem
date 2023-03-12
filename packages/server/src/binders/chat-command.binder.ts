import {
  ChatCommand,
  Inject, InjectMany,
  IPlatformProvider, IRequestFilter, IResponseFilter, Optional,
  PLATFORM_PROVIDER,
  PlayerRequest,
  Reflector,
  REQUEST_FILTER, RESPONSE_FILTER
} from '@vxproject/core';
import { Player } from '@vxproject/natives.server';
import { HandlerBuilder } from '@vxproject/core/dist/flow/handler-builder';

export class ChatCommandBinder {
  @Inject(PLATFORM_PROVIDER)
  private readonly provider: IPlatformProvider;

  @Optional()
  @InjectMany(REQUEST_FILTER)
  private readonly _requestFilters: IRequestFilter[] = [];

  @Optional()
  @InjectMany(RESPONSE_FILTER)
  private readonly _responseFilters: IResponseFilter[] = [];

  public bind(controller: unknown): void {
    const metadata = ChatCommand.getMetadata(controller);
    metadata.forEach(({ method, value: { name, isRestricted } }) => {
      const handler = new HandlerBuilder(Reflector.bindMethod(controller, method))
        .mapRequestFilters(this._requestFilters)
        .mapResponseFilters(this._responseFilters)
        .build();

      const commandHandler = (src: number, args: string[]): Promise<unknown> => {
        const request: PlayerRequest = {
          name: name,
          kind: 'chat command',
          passedArguments: args,
          finalArguments: args,
          metadata: {
            player: src === 0 ? null : new Player(src)
          },
          resource: controller,
          methodName: method
        };
        return handler(request);
      };

      this.provider.onChatCommand(name, commandHandler, isRestricted);
    });
  }
}
