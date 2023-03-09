import { VehiclePart } from './vehicle.part';
import { VehicleWindowTint } from '../../enums';

export class VehicleWindow extends VehiclePart {
  public get tint(): VehicleWindowTint {
    return GetVehicleWindowTint(this.handle);
  }
}
