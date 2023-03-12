import { Ped } from '../../entity/';
import { VehicleSeat as VS } from '../../enums';

export class VehicleSeat {
  public constructor(private readonly handle: number, private readonly index: VS) {}

  public get ped(): Ped {
    const ped = GetPedInVehicleSeat(this.handle, this.index);
    return ped && new Ped(ped);
  }

  public get lastPed(): Ped {
    const ped = GetLastPedInVehicleSeat(this.handle, this.index);
    return ped && new Ped(ped);
  }
}
