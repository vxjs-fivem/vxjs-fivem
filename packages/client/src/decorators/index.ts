import { createHandlerDecorator } from '@vxjs-fivem/core';

export const NuiEvent = createHandlerDecorator<[name: string], { name: string }>('NUI_EVENT', (name) => ({ name }));
export const OnKeyUp = createHandlerDecorator<
  [key: string, layout: string, name: string],
  { key: string; layout: string; name: string }
>('ON_KEY_UP', (key, layout, name) => ({ key, layout, name }));
export const OnKeyDown = createHandlerDecorator<
  [key: string, layout: string, name: string],
  { key: string; layout: string; name: string }
>('ON_KEY_DOWN', (key, layout, name) => ({ key, layout, name }));
