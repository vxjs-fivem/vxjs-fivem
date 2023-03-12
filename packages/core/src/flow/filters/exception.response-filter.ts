import { IEventContext, IResponseFilter } from '../context';
import { EXCEPTION_HANDLER, ILogger, RequestAbortedException } from '../../core';
import { InjectMany, Optional, InjectLogger } from '../../decorators';
import { IExceptionFilter } from '../exceptions';
import { TypeOf } from '../../types';
import { Reflector } from '../../metadata';

export class ExceptionResponseFilter implements IResponseFilter {
  private readonly _nil = Promise.resolve();
  private readonly _exceptionFilters: Map<TypeOf<Error>, IExceptionFilter<Error>>;

  private readonly _logger: ILogger;

  public constructor(
    @InjectLogger() logger: ILogger,
    @Optional() @InjectMany(EXCEPTION_HANDLER) filters: IExceptionFilter<Error> [] = [])
  {
    this._logger = logger;
    this._exceptionFilters = new Map(filters.map(x => {
      const catches = Reflect.get(Reflector.getClass(x), 'catches');
      return [ catches, x ];
    }));

    if (!this._exceptionFilters.has(Error)) {
      this._exceptionFilters.set(Error, {
        catch(context, exception) {
          logger.error(exception, `Unhandled exception while executing ${context.kind} "${context.name}"`);
        }
      });
    }

    if (!this._exceptionFilters.has(RequestAbortedException)) {
      this._exceptionFilters.set(RequestAbortedException, {
        catch(context, exception) {
          logger.debug(`Request for ${context.kind} "${context.name}" is aborted. ${exception}`);
        }
      });
    }
  }

  public onExecuted(context: IEventContext): Promise<void> {
    if (!context.response.exception) {
      return this._nil;
    }

    const handler = this._getHandlerFor(context.response.exception);

    handler.catch(context, context.response.exception);
  }

  private _getHandlerFor(exception: Error): IExceptionFilter<Error> {
    const typeofException = Reflector.getClass(exception);
    const exact = this._exceptionFilters.get(typeofException);

    if (exact) {
      return exact;
    }

    for (const parentType of ExceptionResponseFilter.getPrototypeChain(exception)) {
      const candidate = this._exceptionFilters.get(parentType);
      if (candidate) {
        this._logger.debug(`Setting ${Reflector.getClass(candidate).name} to handle exceptions of type ${typeofException.name}.`);
        this._exceptionFilters.set(typeofException, candidate);
        return candidate;
      }
    }
  }

  private static* getPrototypeChain(exception: Error): IterableIterator<TypeOf<Error>> {
    let proto = Object.getPrototypeOf(exception);

    while (proto.constructor !== Object) {
      yield proto.constructor;
      proto = Object.getPrototypeOf(proto);
    }
  }
}