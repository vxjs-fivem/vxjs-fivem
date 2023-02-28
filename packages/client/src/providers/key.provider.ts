import { IKeyProvider } from '../core';

export class KeyProvider implements IKeyProvider {
  private constructor() {
    //
  }

  public down(key: string, layout: string, name: string): void {
    return null;
  }
  public up(key: string, layout: string, name: string): void {
    return null;
  }
}
