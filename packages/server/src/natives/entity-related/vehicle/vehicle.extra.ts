import { VehiclePart } from './vehicle.part';

export class VehicleExtra extends VehiclePart {
  public isTurnedOn(id: number): boolean {
    return IsVehicleExtraTurnedOn(this.handle, id);
  }
}
