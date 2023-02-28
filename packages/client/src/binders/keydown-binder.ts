import { IBinder, Reflector } from '@vxjs-fivem/core';
import { OnKeyDown } from '../decorators';

export class KeydownBinder implements IBinder {
  public bind(controller: unknown): void {
    const metadata = OnKeyDown.getMetadata(controller);

    metadata.forEach(({ method, value }) => {
      const bound = Reflector.bindMethod(metadata, method);
      onNet(value.name, bound);
    });
  }
}
