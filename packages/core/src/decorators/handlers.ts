import { createHandlerDecorator } from './handler-decorator.factory';

export const NetEvent = createHandlerDecorator<[name: string], { name: string }>('NET_EVENT', (name) => ({ name }));
export const LocalEvent = createHandlerDecorator<[name: string], { name: string }>('LOCAL_EVENT', (name) => ({ name }));
export const Export = createHandlerDecorator<[name: string], { name: string }>('EXPORT', (name) => ({ name }));
export const ChatCommand = createHandlerDecorator<
  [name: string, isRestricted: boolean],
  { name: string; isRestricted: boolean }
>('CHAT_COMMAND', (name, isRestricted: boolean) => ({ name, isRestricted }));

export const Remote = createHandlerDecorator<[name: string], { name: string }>('Remote', (name) => ({ name }));
