import { VehiclePart } from './vehicle.part';

export class VehiclePetrolTank extends VehiclePart {
  public get health(): number {
    return GetVehiclePetrolTankHealth(this.handle);
  }
}
