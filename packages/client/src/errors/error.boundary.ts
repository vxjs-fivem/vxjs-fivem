import { InjectMany, Reflector, TypeOf, ILogger, Inject, LOGGER } from '@vxjs-fivem/core';
import { EventContext } from '../context';
import { ERROR_HANDLER, IErrorBoundary, IErrorHandler } from '../core';

export class ErrorBoundary implements IErrorBoundary {
  @Inject(LOGGER)
  private readonly _logger: ILogger;

  private readonly _handlers = new Map<TypeOf<Error>, IErrorHandler<Error>>();

  private constructor(@InjectMany(ERROR_HANDLER) handlers: IErrorHandler<Error>[] ) {
    this._handlers.set(Error, {
      handle: (context: EventContext, error: Error): void | Promise<void> => {
        const type = context.kind === 'nui' ? 'nui callback' : 'chat command';
        this._logger.error(error, `Error while executing ${type} "${context.invoker}"`);
        return null;
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
    handler.handle(context, error);
  }

  private _findHandler(error: Error): IErrorHandler<Error> {
    const errorType = Reflector.getClass(error);
    const exact = this._handlers.get(errorType);

    if (exact) {
      return exact;
    }

    return this._handlers.get(Error);
  }
}