import { Vehicle } from '../../entity/vehicle';
import { Vector3 } from '../../utils/vector3';

export class VehicleFactory {
  public static create(
    model: string | number,
    position: Vector3,
    heading: number,
    isNetworked = true,
    isMission = true,
  ): Vehicle {
    return new Vehicle(
      CreateVehicle(
        model,
        position.x,
        position.y,
        position.z,
        heading,
        isNetworked,
        isMission,
      ),
    );
  }
}
