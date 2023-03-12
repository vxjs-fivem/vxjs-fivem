import { IApplicationBuilder, IDynamicModule } from '@vxproject/core';
import { KeyBinder } from './binders/key.binder';

export * from './decorators';

export class ClientModule implements IDynamicModule {
  public load(builder: IApplicationBuilder): void {
    builder.addBinder(KeyBinder);
  }

}