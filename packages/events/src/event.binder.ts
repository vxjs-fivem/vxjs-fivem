import { IBinder, Inject } from '@vxjs-fivem/core';
import { ResourceEmitter } from './types';
import { RESOURCE_EMITTER } from './tags';
import { ResourceEvent } from './event.decorator';

export class EventBinder implements IBinder {
  @Inject(RESOURCE_EMITTER)
  private readonly _eventEmitter: ResourceEmitter;
  public bind(controller: unknown): void {
    const metadata = ResourceEvent.getMetadata(controller);
    metadata.forEach(({ method, value: { name } }) => {
      this._eventEmitter.on(eve);
    });
  }

}