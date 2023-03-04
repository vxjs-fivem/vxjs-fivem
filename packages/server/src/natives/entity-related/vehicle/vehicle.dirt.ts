export class VehicleDirt {
  constructor(public readonly handle: number) {}

  public get level(): number {
    return GetVehicleDirtLevel(this.handle);
  }

  public set level(v: number) {
    SetVehicleDirtLevel(this.handle, v);
  }
}
