import { ProviderType, Reflector } from '@vxjs-fivem/core';
import { IGuard } from './guard.interface';
import { GUARDS_TAG } from './guard.const';

export const UseGuards =
  (...guards: ProviderType<IGuard>[]): ClassDecorator & MethodDecorator =>
    (target, method?: string) => {
      Reflect.defineMetadata(guards, GUARDS_TAG, Reflector.getClass(target), method);
    };
