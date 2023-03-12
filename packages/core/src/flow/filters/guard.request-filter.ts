import { IEventContext, IRequestFilter } from '../context';
import { InjectMany, Optional } from '../../decorators';
import { GUARD, RequestAbortedException } from '../../core';
import { IGuard, UseGuards } from '../guards';
import { Reflector } from '../../metadata';

export class GuardRequestFilter implements IRequestFilter {
  @InjectMany(GUARD)
  @Optional()
  public _guards: IGuard[] = [];

  private readonly _cache: Map<unknown, {[p: string]: IGuard[]}> = new Map();

  public async onExecuting(request: IEventContext): Promise<void> {
    for (const x of this._getGuards(request.target, request.methodName)) {
      const canActivate = await x.canActivate(request);
      if (!canActivate) {
        throw new RequestAbortedException(`Aborted by ${Reflector.getClass(x).name}`);
      }
    }
  }

  private _getGuards(target: unknown, method: string): IGuard[] {
    if (!this._cache.has(target)) {
      this._cache.set(target, {});
    }

    const classGuards = this._cache.get(target);

    if (!classGuards[method]) {
      classGuards[method] = UseGuards.getGuards(target, method).map(x => {
        if (typeof x === 'object') {
          return x;
        }
        return this._guards.find(y => Reflector.getClass(y) === x);
      });
    }

    return classGuards[method];
  }
}