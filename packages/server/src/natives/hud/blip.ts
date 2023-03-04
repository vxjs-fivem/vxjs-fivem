import { Entity } from '../entity/entity';
import { Vector3 } from '../utils/vector3';

const getAddOverload = (args: unknown[]): number => {
  const len = args.length;
  if (len === 1) {
    if (args[0] instanceof Entity) {
      return AddBlipForEntity(args[0].handle);
    }
    if (args[0] instanceof Vector3) {
      return AddBlipForCoord(args[0].x, args[0].y, args[0].z);
    }
  }

  if (len === 2) {
    const { x, y, z }: Vector3 = args[0] as Vector3;
    const radius = args[1] as number;
    return AddBlipForRadius(x, y, z, radius);
  }

  const { x, y, z }: Vector3 = args[0] as Vector3;
  const width = args[1] as number;
  const height = args[2] as number;
  return AddBlipForArea(x, y, z, width, height);
};

export class Blip {
  constructor(public readonly handle: number) {}

  public add(pos: Vector3): Blip;
  public add(entity: Entity): Blip;
  public add(pos: Vector3, radius: number): Blip;
  public add(pos: Vector3, width: number, height: number): Blip;
  public add(...args: unknown[]): Blip {
    return new Blip(getAddOverload(args));
  }

  public remove(): void {
    RemoveBlip(this.handle);
  }

  public set sprite(spriteId: number) {
    SetBlipSprite(this.handle, spriteId);
  }

  public get sprite(): number {
    return GetBlipSprite(this.handle);
  }
}
