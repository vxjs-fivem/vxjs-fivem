import { createHandlerDecorator } from '@vxproject/core';

type KeyPropsArray = [key: string, layout: string, description: string]
export type KeyPropsObject = { key: string, layout: string, description: string }
const keyArgsTransformer =
  (...[ key, layout, description ]: KeyPropsArray): KeyPropsObject => ({ key, layout, description });

export const OnKeyDown = createHandlerDecorator<KeyPropsArray, KeyPropsObject>('ON_KEY_DOWN', keyArgsTransformer);
export const OnKeyUp = createHandlerDecorator<KeyPropsArray, KeyPropsObject>('ON_KEY_UP', keyArgsTransformer);

