import { TypeOf } from '../../types';
import { Reflector } from '../../metadata';

export const Catches = <TException extends Error>(exception: TypeOf<TException>): ClassDecorator => (target) => {
  Object.defineProperty(Reflector.getClass(target), 'catches', {
    value: exception,
    writable: false,
    configurable: false,
    enumerable: false,
  });
};