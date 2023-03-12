import { IEventContext, IEventRequest, IRequestFilter, IResponseFilter, UseFilters } from './context';
import { Reflector } from '../metadata';
import { Inject, InjectMany, Optional } from '../decorators';
import { GLOBAL_REQUEST_FILTER, GLOBAL_RESPONSE_FILTER, REQUEST_FILTER, RESPONSE_FILTER } from '../core';

export type BuiltHandler = (context: IEventContext) => Promise<IEventContext>

export class HandlerBuilder {
  @InjectMany(REQUEST_FILTER)
  @Optional()
  private readonly _requestFilters: IRequestFilter[] = [];

  @InjectMany(GLOBAL_REQUEST_FILTER)
  @Optional()
  private readonly _globalRequestFilters: IRequestFilter[] = [];

  @InjectMany(RESPONSE_FILTER)
  @Optional()
  private readonly _responseFilters: IResponseFilter[] = [];

  @InjectMany(GLOBAL_RESPONSE_FILTER)
  @Optional()
  private readonly _globalResponseFilters: IResponseFilter[] = [];

  public build(target: unknown, methodName: string): BuiltHandler {
    const handler = Reflector.bindMethod(target, methodName);
    const [ targetRequestFilters, targetResponseFilters ] = UseFilters.getFilters(target, methodName);

    const requestFilters = [ ...this._globalRequestFilters, ...targetRequestFilters
      .map(x => typeof x === 'object' ? x : this._requestFilters.find(y => Reflector.getClass(y) === x)) ];

    const responseFilters = [ ...this._globalResponseFilters, ...targetResponseFilters
      .map(x => typeof x === 'object' ? x : this._responseFilters.find(y => Reflector.getClass(y) === x)) ];

    return async (context: IEventContext) => {
      try {
        for (const filter of requestFilters) {
          await filter.onExecuting(context);
        }
        context.response.result = await handler(...context.request.finalArguments);
      } catch (e) {
        context.response.exception = e;
      }

      for (const filter of responseFilters) {
        await filter.onExecuted(context);
      }

      return context;
    };

  }
}