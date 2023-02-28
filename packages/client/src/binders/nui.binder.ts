import { CoreMetadata, Inject, InjectMany, Reflector } from '@vxjs-fivem/core';
import { NuiEvent } from '../decorators';
import { NuiProvider } from '../providers';
import { GuardedBinder } from './guarded-binder';
import { GUARDS_TAG, IGuard } from '../guards';

export class NuiBinder extends GuardedBinder {
  @Inject(NuiProvider)
  private provider: NuiProvider;

  public constructor(@InjectMany(GUARDS_TAG) guards: IGuard[]) {
    super(guards);
  }

  public bind(controller: unknown): void {
    const controllerName = Reflect.getMetadata(Reflector.getClass(controller), CoreMetadata.Controller).name;
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
