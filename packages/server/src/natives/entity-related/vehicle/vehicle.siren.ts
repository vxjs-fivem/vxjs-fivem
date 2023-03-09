import { VehiclePart } from './vehicle.part';

export class VehicleSiren extends VehiclePart {
  public get isOn(): boolean {
    return IsVehicleSirenOn(this.handle);
  }
}
