import { ProviderType, Reflector } from '@vxjs-fivem/core';
import { IGuard } from './guard.interface';

export abstract class GuardHelper {
  private static _key = 'GUARD_METADATA';
  public static set<T>(target: ProviderType<T>, guards: ProviderType<IGuard>[], method?: string): void {
    Reflect.defineMetadata(this._key, guards, Reflector.getClass(target), method);
  }

  public static get<T>(target: ProviderType<T>, method?: string): ProviderType<IGuard>[] {
    const guards: ProviderType<IGuard>[] = [];
    const type = Reflector.getClass(target);
    guards.push(...(Reflect.getMetadata(this._key, type) ?? []));
    if (method) {
      guards.push(...(Reflect.getMetadata(this._key, type, method) ?? []));
    }
    return [...new Set(guards)];
  }
}
