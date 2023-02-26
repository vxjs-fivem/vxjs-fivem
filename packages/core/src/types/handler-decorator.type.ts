import { MethodMetadataType } from './metadata.type';

export type HandlerDecoratorMetadataGetter<TValue> = {
  getMetadata(target: unknown): MethodMetadataType<TValue>[];
};

export type HandlerDecoratorType<TArgs extends unknown[], TMetadata extends Record<string, unknown>> = ((
  ...args: TArgs
) => MethodDecorator) &
  HandlerDecoratorMetadataGetter<TMetadata>;
