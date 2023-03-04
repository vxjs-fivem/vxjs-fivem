import { NetContext, NetContextKind, TNetContextKind } from '../context';
import { IExceptionBoundary } from './exception.boundary.interface';
import { ILogger, Inject, InjectMany, LOGGER, Reflector, TypeOf } from '@vxjs-fivem/core';
import { IExceptionFilter } from './exception.filter.interface';
import { EXCEPTION_FILTER } from '../../core';

class DefaultExceptionFilter implements IExceptionFilter<Error> {
  public constructor(private readonly _logger: ILogger) {}
  public catch(context: NetContext, error: Error): void {
    const type = this.getType(context.kind);
    this._logger.error(error, `Error while executing ${type} "${context.eventName}"`);
  }

  private getType(type: TNetContextKind): string {
    switch (type) {
      case NetContextKind.NetEvent:
        return 'network event';
      case NetContextKind.ChatCommand:
        return 'chat command';
      case NetContextKind.RemoteRequest:
        return 'remote request';
      default:
        return type.toString();
    }
  }
}

export class ExceptionBoundary implements IExceptionBoundary {
  private readonly _handlers = new Map<TypeOf<Error>, IExceptionFilter<Error>>();
  private constructor(
    @InjectMany(EXCEPTION_FILTER) handlers: IExceptionFilter<Error>[],
    @Inject(LOGGER) private readonly _logger: ILogger
  ) {
    this._handlers.set(Error, new DefaultExceptionFilter(_logger));
    handlers.forEach((x) => {
      const type = Reflect.getMetadata('CATCHES', Reflector.getClass(x));
      this._handlers.set(type, x);
    });
  }

  public handle(context: NetContext, exception: Error): void {
    const exceptionType = Reflector.getClass(exception);
    const handler = this._handlers.get(exceptionType) ?? this._handlers.get(Error);
    return handler.catch(context, exception);
  }
}
