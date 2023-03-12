import { Vector3 } from '../utils/vector3';

export class PlayerCamera {
  public constructor(private readonly source: string) {}

  public get rotation(): Vector3 {
    const [ x, y, z ] = GetPlayerCameraRotation(this.source);
    return new Vector3(x, y, z);
  }
}
