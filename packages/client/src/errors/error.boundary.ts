import { InjectMany, Reflector, TypeOf } from '@vxjs-fivem/core';
import { EventContext } from '../context';
import { ERROR_HANDLER, IErrorBoundary, IErrorHandler } from '../core';

export class ErrorBoundary implements IErrorBoundary {

  private readonly _handlers = new Map<TypeOf<Error>, IErrorHandler<Error>>();

  private constructor(@InjectMany(ERROR_HANDLER) handlers: IErrorHandler<Error>[] ) {
    this._handlers.set(Error, {
      handle(context: EventContext, error: Error): void | Promise<void> {
        throw error;
      }
    });
    
    handlers.forEach((handler) => {
      const handles: TypeOf<Error> = Reflector.getClass(handler)['__handles'];
      if (!handles) {
        return;
      }
      this._handlers.set(handles, handler);
    });
  }

  public async handle(context: EventContext, error: Error): Promise<void> {
    const handler = this._findHandler(error);
    if (!handler) {
      throw e;
    }
    handler.handle(context, error);
  }

  private _findHandler(error: Error): IErrorHandler<Error> {
    const errorType = Reflector.getClass(error);
    const exact = this._handlers.get(errorType);

    if (exact) {
      return exact;
    }

    for (const [ type, handler ] of this._handlers) {
      if (error instanceof type) {
        return handler;
      }
    }

  }
}