import { Vector3 } from '../../utils/vector3';
import { Prop } from '../../entity/prop';

export abstract class PropFactory {
  public static create(
    model: string | number,
    position: Vector3,
    isNetworked = true,
    isMission = true,
    isDoor = false,
  ): Prop {
    return new Prop(
      CreateObject(
        model,
        position.x,
        position.y,
        position.z,
        isNetworked,
        isMission,
        isDoor,
      ),
    );
  }

  public static createNoOffset(
    model: string | number,
    position: Vector3,
    isNetworked = true,
    isMission = true,
    isDoor = false,
  ): Prop {
    return new Prop(
      CreateObjectNoOffset(
        model,
        position.x,
        position.y,
        position.z,
        isNetworked,
        isMission,
        isDoor,
      ),
    );
  }
}
