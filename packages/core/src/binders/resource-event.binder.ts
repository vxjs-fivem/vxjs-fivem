import { IBinder } from '../types';
import { Inject, Optional, ResourceEvent } from '../decorators';
import { IResourceEventProvider, RESOURCE_EVENT_PROVIDER } from '../core';
import { Reflector } from '../metadata';

export class ResourceEventBinder implements IBinder {
  @Inject(RESOURCE_EVENT_PROVIDER)
  @Optional()
  private readonly _provider: IResourceEventProvider;
  public bind(controller: unknown): void {
    const metadata = ResourceEvent.getMetadata(controller);

    metadata.forEach(({ method, value: { name } }) => {
      this._provider.on(name, Reflector.bindMethod(controller, method));
    });
  }
}
