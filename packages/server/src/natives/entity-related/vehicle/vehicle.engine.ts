export class VehicleEngine {
  constructor(private readonly handle: number) {}

  public get isRunning(): boolean {
    return GetIsVehicleEngineRunning(this.handle);
  }

  public get health(): number {
    return GetVehicleEngineHealth(this.handle);
  }

  public get isStarting(): boolean {
    return IsVehicleEngineStarting(this.handle);
  }
}
