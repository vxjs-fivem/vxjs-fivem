import { VehiclePart } from './vehicle.part';
import { VehicleDoorsLockStatus } from '../../enums';

class VehicleDoor extends VehiclePart {
  public constructor(handle: number, private readonly index: number) {
    super(handle);
  }

  public set isBroken(v: boolean) {
    SetVehicleDoorBroken(this.handle, this.index, v);
  }
}

export class VehicleDoors extends VehiclePart {
  public get lockStatus(): number {
    return GetVehicleDoorLockStatus(this.handle);
  }

  public get status(): number {
    return GetVehicleDoorStatus(this.handle);
  }

  public get isLockedForPlayers(): number {
    return GetVehicleDoorsLockedForPlayer(this.handle);
  }

  public byIndex(index: number): VehicleDoor {
    return new VehicleDoor(this.handle, index);
  }

  public setLocked(status: VehicleDoorsLockStatus): void {
    SetVehicleDoorsLocked(this.handle, status);
  }
}
