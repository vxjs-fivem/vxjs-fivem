import { ChatCommandBinder, NetEventBinder, RemoteRequestBinder } from './binders';
import { IApplicationBuilder, IDynamicModule } from '@vxproject/core';

export class ServerModule implements IDynamicModule {
  public load(builder: IApplicationBuilder): void {
    builder.addBinder(ChatCommandBinder);
    builder.addBinder(NetEventBinder);
    builder.addBinder(RemoteRequestBinder);
  }
}
