import { Fn, IBinder, ProviderType, Reflector, TypeOf } from '@vxjs-fivem/core';
import { GUARDS_TAG, IGuard } from '../guards';
import { EventContext } from '../context';

export abstract class GuardedBinder implements IBinder {
  private readonly _guards: IGuard[];
  protected constructor(guards: IGuard[]) {
    this._guards = guards;
  }

  public abstract bind(controller: unknown): void;

  protected getGuards(target: unknown, method: string): IGuard[] {
    const classGuards = Reflect.getMetadata(GUARDS_TAG, Reflector.getClass(target)) ?? [];
    const methodGuards = Reflect.getMetadata(GUARDS_TAG, Reflector.getClass(target), method) ?? [];
    return this.resolveGuards([ ...classGuards, ...methodGuards ]);
  }

  private resolveGuards(guards: ProviderType<IGuard>[]): IGuard[] {
    return guards.map((x) => {
      if (typeof guards === 'function') {
        return this._guards.find((y) => y.constructor === (x as TypeOf<IGuard>));
      }

      return x as IGuard;
    });
  }

  private defaultArgsTransformer = (args: unknown[]): unknown[] => args;

  protected guardHandler(
    target: unknown,
    method: string,
    name: string,
    kind: EventContext['kind'],
    argsTransformer = this.defaultArgsTransformer
  ): Fn {
    const handler = Reflector.bindMethod(target, method);
    const guards = this.getGuards(target, method);
    return async (...args: unknown[]) => {
      const context: EventContext = {
        handler,
        kind,
        passedArguments: args,
        target,
        invoker: name,
        transformedArguments: argsTransformer(args),
      };

      for (const guard of guards) {
        const canActivate = await guard.canActivate(context);
        if (!canActivate) {
          return 'FORBIDDEN';
        }
      }

      return handler(...context.transformedArguments);
    };
  }
}
