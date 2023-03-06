import { VehiclePart } from './vehicle.part';
import { RGB } from '../../utils';

export class VehicleWheel extends VehiclePart {
  public get smokeColor(): RGB {
    const [ r, g, b ] = GetVehicleTyreSmokeColor(this.handle);
    return { r, g, b };
  }

  public get type(): number {
    return GetVehicleWheelType(this.handle);
  }

  public isTyreBurst(wheelId: number, isCompletelyBurst = true): boolean {
    return IsVehicleTyreBurst(this.handle, wheelId, isCompletelyBurst);
  }
}
