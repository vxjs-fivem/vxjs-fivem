import { IRpcProvider } from '../core';
import { Fn } from '@vxjs-fivem/core';

export class RpcProvider implements IRpcProvider {
  public emit(name: string, handler: Fn): void {
  }

  public emitAsync<T>(name: string, handler: Fn): Promise<T> {
    return Promise.resolve(undefined);
  }

  public on(name: string, handler: Fn): void {
  }

}
