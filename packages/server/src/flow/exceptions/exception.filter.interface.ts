import { Reflector, TypeOf } from '@vxjs-fivem/core';
import { NetContext } from '../context';

export interface IExceptionFilter<TError extends Error> {
  catch(context: NetContext, error: TError): void;
}

export const Catches =
  <TError extends Error>(error: TypeOf<TError>): ClassDecorator =>
    (target: unknown) => {
      const errorType = Reflector.getClass(error);
      const targetType = Reflector.getClass(target);

      Reflect.defineMetadata('CATCHES', errorType, targetType);
    };
