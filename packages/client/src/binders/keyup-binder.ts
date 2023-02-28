import { IBinder, Reflector } from '@vxjs-fivem/core';
import { OnKeyUp } from '../decorators';

export class KeyupBinder implements IBinder {
  public bind(controller: unknown): void {
    const metadata = OnKeyUp.getMetadata(controller);

    metadata.forEach(({ method, value }) => {
      const bound = Reflector.bindMethod(metadata, method);
      onNet(value.name, bound);
    });
  }
}
