import { VehiclePart } from './vehicle.part';

export class VehicleRadio extends VehiclePart {
  public get station(): number {
    return GetVehicleRadioStationIndex(this.handle);
  }
}
