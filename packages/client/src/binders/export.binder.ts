import { Export, IBinder, Inject, Reflector } from '@vxjs-fivem/core';
import { IPlatformProvider, PLATFORM_PROVIDER } from '../core';

export class ExportBinder implements IBinder {
  @Inject(PLATFORM_PROVIDER)
  private readonly provider: IPlatformProvider;

  public bind(controller: unknown): void {
    const metadata = Export.getMetadata(controller);

    metadata.forEach(({ method, value }) => {
      const bound = Reflector.bindMethod(controller, method);
      this.provider.onExport(value.name, bound);
    });
  }
}
