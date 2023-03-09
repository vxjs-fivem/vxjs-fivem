export class VehicleBody {
  public constructor(private readonly handle: number) {}

  public get health(): number {
    return GetVehicleBodyHealth(this.handle);
  }

  public set health(value: number) {
    SetVehicleBodyHealth(this.handle, value);
  }
}
