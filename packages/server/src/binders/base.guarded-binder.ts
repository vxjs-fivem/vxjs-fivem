import { GuardHelper, IGuard, NetContext, IExceptionBoundary } from '../flow';
import { IBinder, Reflector } from '@vxjs-fivem/core';

type MappedGuardsFn = (context: NetContext) => Promise<unknown>;

export abstract class BaseGuardedBinder implements IBinder {
  protected constructor(private readonly _guards: IGuard[], private readonly _exceptionHandler: IExceptionBoundary) {}

  public abstract bind(controller: unknown): void;

  protected createWrapper(target: unknown, method: string): MappedGuardsFn {
    const handler = this.mapGuards(target, method);
    return this.catchErrors(handler);
  }

  protected catchErrors(handler: MappedGuardsFn): MappedGuardsFn {
    return async (context) => {
      try {
        await handler(context);
      } catch (e) {
        await this._exceptionHandler.handle(context, e);
        return { __error: e };
      }
    };
  }

  protected mapGuards(target: unknown, method: string): MappedGuardsFn {
    const guards = this.getGuards(target, method);
    const handler = Reflector.bindMethod(target, method);
    return async (context) => {
      for (const guard of guards) {
        const canActivate = await guard.canActivate(context);
        if (!canActivate) {
          return { __forbidden: true };
        }
      }
      if (context.player) {
        context.args.splice(0, 0, context.player);
      }
      return await handler(...context.args);
    };
  }

  private getGuards(target: unknown, method: string): IGuard[] {
    const guards = GuardHelper.get(target, method);
    return guards.map((x) => {
      if (typeof x === 'function') {
        return this._guards.find((y) => y.constructor === x);
      }
      return x;
    });
  }
}
