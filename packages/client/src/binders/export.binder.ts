import { Export, IBinder, Inject, Reflector } from '@vxjs-fivem/core';
import { IPlatformProvider, PlatformProvider } from '../core';

export class ExportBinder implements IBinder {
  @Inject(PlatformProvider)
  private readonly provider: IPlatformProvider;

  public bind(controller: unknown): void {
    const metadata = Export.getMetadata(controller);

    metadata.forEach(({ method, value }) => {
      const bound = Reflector.bindMethod(controller, method);
      this.provider.export(value.name, bound);
    });
  }
}
