import { VehiclePart } from './vehicle.part';

export class VehicleLivery extends VehiclePart {
  public get roof(): number {
    return GetVehicleRoofLivery(this.handle);
  }

  public get index(): number {
    return GetVehicleLivery(this.handle);
  }
}
