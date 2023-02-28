import { Fn } from '@vxjs-fivem/core';
import { INuiProvider } from '../core';

export class NuiProvider implements INuiProvider {

  public on(name: string, handler: Fn): void {
    RegisterNuiCallbackType(name);

    on(`__cfx_nui:${name}`, async (data, cb) => {
      const ret = await handler(data);
      cb(ret ?? 'response');
    });
  }

  public emit<T>(name: string, payload: T): void {
    SendNUIMessage({
      eventName: name,
      payload: payload
    });
  }
}
