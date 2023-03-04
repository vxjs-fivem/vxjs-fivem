import { ProviderType } from '@vxjs-fivem/core';
import { IGuard } from './guard.interface';
import { GuardHelper } from './guard.helper';

export const UseGuards =
  (...guards: ProviderType<IGuard>[]): ClassDecorator & MethodDecorator =>
  (target: unknown, methodName?: string) => {
    GuardHelper.set(target, guards, methodName);
  };
