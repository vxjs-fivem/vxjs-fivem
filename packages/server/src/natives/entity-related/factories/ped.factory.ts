import { Ped } from '../../entity/ped';
import { Vector3 } from '../../utils/vector3';
import { Vehicle } from '../../entity/vehicle';

export abstract class PedFactory {
  public static create(
    type: number,
    model: string | number,
    position: Vector3,
    heading: number,
    isNetworked = true,
    bScriptHostPed = true,
  ): Ped {
    return new Ped(
      CreatePed(
        type,
        model,
        position.x,
        position.y,
        position.z,
        heading,
        isNetworked,
        bScriptHostPed,
      ),
    );
  }

  public static createInsideVehicle(
    vehicle: Vehicle,
    type: number,
    model: string | number,
    seat: number,
    isNetworked = true,
    bScriptHostPed = true,
  ): Ped {
    return new Ped(
      CreatePedInsideVehicle(
        vehicle.handle,
        type,
        model,
        seat,
        isNetworked,
        bScriptHostPed,
      ),
    );
  }
}
