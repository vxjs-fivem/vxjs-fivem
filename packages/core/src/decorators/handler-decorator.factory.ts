import { HandlerDecoratorType, MethodMetadataType } from '../types';
import { Reflector } from '../metadata';

export const createHandlerDecorator = <TArgs extends unknown[], TMetadata extends Record<string, unknown>>(
  key: string,
  argsTransformer: (...args: TArgs) => TMetadata
): HandlerDecoratorType<TArgs, TMetadata> => {
  const handler = (...args: TArgs): MethodDecorator => {
    const transformedArgs = argsTransformer(...args);
    const decorator = (target: unknown, method: string): void => {
      const oldMetadata = Reflect.getMetadata(key, target, method) ?? [];

      oldMetadata.push(transformedArgs);

      Reflect.defineMetadata(key, oldMetadata, target, method);
    };

    return decorator;
  };

  handler.getMetadata = (target: unknown): MethodMetadataType<TMetadata>[] => {
    const methods = Object.getOwnPropertyNames(Reflector.getClass(target).prototype);
    const ret: MethodMetadataType<TMetadata>[] = [];

    methods.forEach(method => {
      if (method === 'constructor' || typeof target[method] !== 'function') {
        return;
      }
      const metadata =  Reflect.getMetadata(key, target, method);

      if (!metadata) {
        return;
      }

      metadata.forEach(value => {
        ret.push({
          value,
          method,
          kind: 'method'
        });
      });
    });

    return ret;
  };

  return handler;
};
