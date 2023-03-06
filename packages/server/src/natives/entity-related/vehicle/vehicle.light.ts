export class VehicleLight {
  public constructor(private readonly handle: number) {}

  public get colour(): number {
    return GetVehicleHeadlightsColour(this.handle);
  }

  public get state(): {
    isOn: boolean;
    areLightsOn: boolean;
    areHighBeamsOn: boolean;
    } {
    const [ isOn, areLightsOn, areHighBeamsOn ] = GetVehicleLightsState(
      this.handle,
    );
    return { isOn, areLightsOn, areHighBeamsOn };
  }
}
