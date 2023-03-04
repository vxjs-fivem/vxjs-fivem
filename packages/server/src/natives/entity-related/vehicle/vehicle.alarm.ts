import { VehiclePart } from './vehicle.part';

export class VehicleAlarm extends VehiclePart {
  public set isOn(value: boolean) {
    SetVehicleAlarm(this.handle, value);
  }
}
