import {
  CONFIG_SERVICE,
  CoreMetadata,
  Fn,
  IConfigService,
  Inject,
  InjectMany,
  IPlatformProvider,
  Optional,
  PLATFORM_PROVIDER,
  Reflector,
  RemoteRequest,
  RpcCodes,
  IGuard, IExceptionBoundary, NetContext, GUARD_PROVIDER, EXCEPTION_BOUNDARY
} from '@vxjs-fivem/core';
import { BaseGuardedBinder } from './base.guarded-binder';
import { Player } from '../natives';

type RpcReqHandler = (id: string | number, resource: string, handlerName: string, payload: unknown[]) => unknown;
type RpcRegisteredHandler = (player: Player, payload: unknown[]) => unknown;

export class RemoteRequestBinder extends BaseGuardedBinder {
  private readonly _handlers: Record<string, RpcRegisteredHandler> = {};

  public constructor(
    @Inject(PLATFORM_PROVIDER)
    private readonly _provider: IPlatformProvider,
    @Optional() @InjectMany(GUARD_PROVIDER) guards: IGuard[] = [],
    @Inject(EXCEPTION_BOUNDARY) handler: IExceptionBoundary,
    @Inject(CONFIG_SERVICE) config: IConfigService
  ) {
    super(guards, handler);
    const requestName = `vx.${config.getOrThrow('resourceName')}.rpc.request`;
    const rpcHandler: RpcReqHandler = async (id, resource, handlerName, payload) => {
      const replyName = `vx.${resource}.rpc.reply`;
      const player = new Player(global.source);
      const handler = this._handlers[handlerName];
      if (!handler) {
        return player.emit(replyName, id, { __code: RpcCodes.NotFound });
      }
      const result = (await handler(player, payload)) as Record<string, unknown>;
      if (!result) {
        return player.emit(replyName, id, null);
      }
      if ('__error' in result) {
        return player.emit(replyName, id, { __code: RpcCodes.Error, error: result.__error });
      }

      if ('__forbidden' in result) {
        return player.emit(replyName, id, { __code: RpcCodes.Forbidden });
      }

      return result;
    };

    this._provider.onNetEvent(requestName, rpcHandler);
  }

  public bind(controller: unknown): void {
    const metadata = RemoteRequest.getMetadata(controller);
    const controllerName = Reflect.getMetadata(CoreMetadata.Controller, Reflector.getClass(controller)).name;
    metadata.forEach(({ method }) => {
      const eventName = controllerName + '.' + method;
      this._handlers[eventName] = this.createHandler(
        this.createWrapper(controller, method),
        eventName,
        controller,
        method
      );
    });
  }

  private createHandler(handler: Fn, eventName: string, target: unknown, methodName: string): RpcRegisteredHandler {
    return (player, payload) => {
      const context = Object.assign(new NetContext(), {
        eventName,
        kind: 'remote request',
        args: payload,
        player,
        target: target,
        methodName: methodName
      });
      return handler(context);
    };
  }
}
