import { ProviderType } from '../../types';
import { Reflector } from '../../metadata';
import { IGuard } from './guard.interface';

const KEY = Symbol('GUARDS');

export const UseGuards = (...guards: ProviderType<IGuard>[]): ClassDecorator & MethodDecorator => (target, method?) => {
  Reflect.defineMetadata(KEY, guards, Reflector.getClass(target), method);
};

UseGuards.getGuards = (target: unknown, method?: string): ProviderType<IGuard>[] => {
  const guards = Reflect.getMetadata(KEY, Reflector.getClass(target)) ?? [];
  if (method) {
    guards.push(...(Reflect.getMetadata(KEY, Reflector.getClass(target), method) ?? []));
  }
  return guards;
};