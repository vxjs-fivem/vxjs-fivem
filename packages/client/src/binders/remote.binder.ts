import { IBinder, Reflector, Remote } from '@vxjs-fivem/core';

export class RemoteBinder implements IBinder {
  public bind(controller: unknown): void {
    const metadata = Remote.getMetadata(controller);

    metadata.forEach(({ method, value }) => {
      const bound = Reflector.bindMethod(metadata, method);
      onNet(value.name, bound);
    });
  }
}
