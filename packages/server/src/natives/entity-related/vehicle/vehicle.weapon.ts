import { VehicleLockOnState } from '../../enums';
import { Vehicle } from '../../entity';

export class VehicleWeapon {
  constructor(private readonly handle: number) {}

  public get lockOnState(): VehicleLockOnState {
    return GetVehicleHomingLockonState(this.handle);
  }

  public lockOnTarget(): Vehicle {
    const r = GetVehicleLockOnTarget(this.handle);
    return r && new Vehicle(this.handle);
  }
}
