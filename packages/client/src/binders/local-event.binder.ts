import { IBinder, Inject, LocalEvent, Reflector } from '@vxjs-fivem/core';
import { IPlatformProvider, PlatformProvider } from '../core';

export class LocalEventBinder implements IBinder {
  @Inject(PlatformProvider)
  private readonly provider: IPlatformProvider;
  public bind(controller: unknown): void {
    const metadata = LocalEvent.getMetadata(controller);

    metadata.forEach(({ method, value }) => {
      const bound = Reflector.bindMethod(controller, method);
      this.provider.on(value.name, bound);
    });
  }
}
