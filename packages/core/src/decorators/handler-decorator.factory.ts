import { HandlerDecoratorType, MethodMetadataType } from '../types';
import { Reflector } from '../metadata/reflector';

export const createHandlerDecorator = <TArgs extends unknown[], TMetadata extends Record<string, unknown>>(
  key: string,
  argsTransformer: (...args: TArgs) => TMetadata
): HandlerDecoratorType<TArgs, TMetadata> => {
  const handler = (...args: TArgs): MethodDecorator => {
    const decorator = (target: unknown, method: string): void => {
      Reflector.setMethodMetadata(target, method, key, argsTransformer(...args));
    };

    return decorator;
  };

  handler.getMetadata = (target: unknown): MethodMetadataType<TMetadata>[] => {
    return Reflector.getCustomMethodMetadata(target, key);
  };

  return handler;
};
