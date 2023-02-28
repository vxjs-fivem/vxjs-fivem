import { IBinder, Inject, NetEvent, Reflector } from '@vxjs-fivem/core';
import { IPlatformProvider, PlatformProvider } from '../core';

export class NetEventBinder implements IBinder {
  @Inject(PlatformProvider)
  private readonly provider: IPlatformProvider;
  public bind(controller: unknown): void {
    const metadata = NetEvent.getMetadata(controller);

    metadata.forEach(({ method, value }) => {
      const bound = Reflector.bindMethod(controller, method);
      this.provider.onNet(value.name, bound);
    });
  }
}
