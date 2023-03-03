import { CoreMetadata, Inject, InjectMany, Reflector } from '@vxjs-fivem/core';
import { NuiEvent } from '../decorators';
import { GuardedBinder } from './guarded-binder';
import { GUARDS_TAG, IGuard } from '../guards';
import { INuiProvider, NUI_PROVIDER } from '../core';

export class NuiBinder extends GuardedBinder {
  @Inject(NUI_PROVIDER)
  private provider: INuiProvider;

  public constructor(@InjectMany(GUARDS_TAG) guards: IGuard[]) {
    super(guards);
  }

  public bind(controller: unknown): void {
    const controllerName = Reflect.getMetadata(CoreMetadata.Controller, Reflector.getClass(controller)).name;
    const metadata = NuiEvent.getMetadata(controller);

    metadata.forEach(({ method, value: { name } }) => {
      const callbackName = this.toUrl(controllerName, name.toLowerCase());
      this.provider.on(callbackName, this.guardHandler(controller, method, name, 'nui'));
    });
  }

  private toUrl(controllerName: string, name: string): string {
    const result = controllerName.replace( /([A-Z])/g, ' $1' );
    return result.split(' ')
      .join('/')
      .toLowerCase() + '/' + name;
  }
}
