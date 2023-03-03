import { IBinder } from '../types';
import { IPlatformProvider, PLATFORM_PROVIDER } from '../core';
import { Inject, LocalEvent } from '../decorators';
import { Reflector } from '../metadata';

export class LocalEventBinder implements IBinder {
  @Inject(PLATFORM_PROVIDER)
  private readonly _provider: IPlatformProvider;
  public bind(controller: unknown): void {
    const metadata = LocalEvent.getMetadata(controller);
    metadata.forEach(({ method, value: { name } }) => {
      this._provider.onLocalEvent(name, Reflector.bindMethod(controller, method));
    });
  }
}
