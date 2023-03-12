import { Entity } from './';

export class Prop extends Entity {
  public constructor(handle: number) {
    super(handle);
  }

  public static get all(): Prop[] {
    return GetAllObjects().map(el => new Prop(el));
  }
}
