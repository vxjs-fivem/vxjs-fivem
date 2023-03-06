export class VehiclePlate {
  public constructor(private readonly handle: number) {}

  public get text(): string {
    return GetVehicleNumberPlateText(this.handle);
  }

  public set text(text: string) {
    SetVehicleNumberPlateText(this.handle, text);
  }

  public get index(): number {
    return GetVehicleNumberPlateTextIndex(this.handle);
  }
}
