import { IApplicationBuilder, IDynamicModule, ProviderType, TypeOf } from '@vxjs-fivem/core';
import { ChatCommandBinder, NetEventBinder, RemoteRequestBinder } from './binders';
import { EXCEPTION_BOUNDARY, EXCEPTION_FILTER, GUARD_PROVIDER } from './core';
import { ExceptionBoundary } from './flow/exceptions/exception.boundary';
import { IExceptionBoundary, IGuard, IExceptionFilter } from './flow';
import { LoggerFactory } from './providers';

export class ServerModule implements IDynamicModule {
  private readonly _guards: ProviderType<IGuard>[] = [];
  private readonly _exceptionFilters: ProviderType<IExceptionFilter<Error>>[] = [];
  public load(builder: IApplicationBuilder): void {
    builder.services.add<IExceptionBoundary>(EXCEPTION_BOUNDARY, ExceptionBoundary as never);
    builder.addBinder(ChatCommandBinder);
    builder.addBinder(NetEventBinder);
    builder.addBinder(RemoteRequestBinder);
    [ ...new Set(this._guards) ].forEach((x) => builder.services.add(GUARD_PROVIDER, x));
    [ ...new Set(this._exceptionFilters) ].forEach((x) => builder.services.add(EXCEPTION_FILTER, x));
    
    builder.setLoggingFactory(new LoggerFactory());
  }

  public addGuard(guard: ProviderType<IGuard>): this {
    this._guards.push(guard);
    return this;
  }

  public addExceptionFilter<T extends Error>(filter: ProviderType<IExceptionFilter<T>>): this {
    this._exceptionFilters.push(filter);
    return this;
  }
}
