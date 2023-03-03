import { IApplicationBuilder, IDynamicModule, ProviderType, Reflector, TypeOf } from '@vxjs-fivem/core';
import {
  ChatCommandBinder,
  ExportBinder,
  KeydownBinder,
  KeyupBinder,
  LocalEventBinder,
  NetEventBinder, NuiBinder, RemoteBinder
} from './binders';
import { FivemClientProvider, KeyProvider, NuiProvider, RpcProvider } from './providers';
import { GUARDS_TAG, NuiActiveGuard } from './guards';
import {
  ERROR_HANDLER, IKeyProvider,
  INuiProvider,
  IPlatformProvider, IRpcProvider,
  KEY_PROVIDER,
  NUI_PROVIDER, PLATFORM_PROVIDER,
  RPC_PROVIDER
  , IErrorHandler, IErrorBoundary, ERROR_BOUNDARY
} from './core';
import { ErrorBoundary } from './errors';

export class ClientModule implements IDynamicModule {
  private _errorHandlers: Map<TypeOf<Error>, ProviderType<IErrorHandler<Error>>> = new Map();
  private readonly nuiActiveFieldName = 'isNuiActive';
  private readonly _platformProvider: ProviderType<IPlatformProvider>;

  public constructor(provider?: ProviderType<IPlatformProvider>) {
    this._platformProvider = provider;
  }

  public load(builder: IApplicationBuilder): void {
    builder
      .addBinder(ChatCommandBinder)
      .addBinder(ExportBinder)
      .addBinder(KeydownBinder)
      .addBinder(KeyupBinder)
      .addBinder(LocalEventBinder)
      .addBinder(NetEventBinder)
      .addBinder(NuiBinder)
      .addBinder(RemoteBinder);

    builder.services
      .add<IPlatformProvider>(PLATFORM_PROVIDER, this._platformProvider ?? FivemClientProvider)
      .add<IKeyProvider>(KEY_PROVIDER, Reflect.construct(KeyProvider, []))
      .add<INuiProvider>(NUI_PROVIDER, Reflect.construct(NuiProvider, []))
      .add<IRpcProvider>(RPC_PROVIDER, Reflect.construct(RpcProvider, []))
      .add<IErrorBoundary>(ERROR_BOUNDARY, ErrorBoundary as never)
      .add(GUARDS_TAG, new NuiActiveGuard(this.nuiActiveFieldName));

    this._errorHandlers.forEach((handler, type ) => {
      if (!type) {
        return;
      }
      Reflector.getClass(handler)['__handles'] = type;
      builder.services.add(ERROR_HANDLER, handler);
    });
  }

  public addErrorHandler<TError extends Error>(
    type: TypeOf<TError>,
    handler: ProviderType<IErrorHandler<TError>>
  ): this {
    this._errorHandlers.set(type, handler);
    return this;
  }

}
