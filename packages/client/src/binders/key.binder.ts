import { Fn, IBinder, Inject, MethodMetadataType, Reflector, HandlerBuilder, IEventContext } from '@vxproject/core';
import { KeyPropsObject, OnKeyDown, OnKeyUp } from '../decorators';

export class KeyBinder implements IBinder {
  private _store: Record<string, Fn[]> = {};

  @Inject(HandlerBuilder)
  private readonly _builder: HandlerBuilder;

  public constructor() {
    RegisterCommand('+keypress', async (s, args) => {
      const [ key, layout ] = args;
      const handlers = this._store[this._getMask(layout, key, false)];
      if (handlers) {
        await Promise.all(handlers.map(async x => x(key, layout)));
      }
    }, false);

    RegisterCommand('-keypress', async (s, args) => {
      const [ key, layout ] = args;
      const handlers = this._store[this._getMask(layout, key, true)];
      if (handlers) {
        await Promise.all(handlers.map(async x => x(key, layout)));
      }
    }, false);

    on('onResourceStart', r => {
      if (r === GetCurrentResourceName()) {
        emit('chat:removeSuggestion', '/-keypress');
        emit('chat:removeSuggestion', '/+keypress');
      }
    });
  }

  public bind(controller: unknown): void {
    const keyUps = OnKeyUp.getMetadata(controller);
    const keyDowns = OnKeyDown.getMetadata(controller);
    this._registerKey(controller, keyUps, true);
    this._registerKey(controller, keyDowns, false);
  }

  private _registerKey(target: unknown, keys: MethodMetadataType<KeyPropsObject>[], isUp: boolean): void {
    const kind = isUp ? 'key up handler' : 'key down handler';
    keys.forEach(({ method, value: { layout, key, description } }) => {
      RegisterKeyMapping(`+keypress ${key} ${layout}`, description, layout.toUpperCase(), key.toUpperCase());
      const mask = this._getMask(layout, key, isUp);
      this._store[mask] ??= [];
      const handler = this._builder.build(target, method);
      this._store[mask].push((...args: unknown[]) => {
        const context: IEventContext = {
          kind,
          metadata: {},
          methodName: method,
          name: mask,
          request: {
            passedArguments: args,
            finalArguments: args,
          },
          response: {},
          target,
        };
        return handler(context);
      });
    });
  }

  private _getMask(layout: string, key: string, isUp: boolean): string {
    return `${layout} ${key} ${isUp ? 'up' : 'down'}`;
  }
}