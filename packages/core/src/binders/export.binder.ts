import { IBinder } from '../types';
import { IPlatformProvider, PLATFORM_PROVIDER } from '../core';
import { Export, Inject } from '../decorators';
import { Reflector } from '../metadata';

export class ExportBinder implements IBinder {
  @Inject(PLATFORM_PROVIDER)
  private readonly _provider: IPlatformProvider;
  public bind(controller: unknown): void {
    const metadata = Export.getMetadata(controller);
    metadata.forEach(({ method, value: { name } }) => {
      this._provider.onExport(name, Reflector.bindMethod(controller, method));
    });
  }
}
