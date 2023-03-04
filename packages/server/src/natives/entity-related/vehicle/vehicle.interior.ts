export class VehicleInterior {
  constructor(private readonly handle: number) {}

  public get colour(): number {
    return GetVehicleInteriorColour(this.handle);
  }
}
