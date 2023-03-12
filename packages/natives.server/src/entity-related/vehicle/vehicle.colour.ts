import { RGB } from '../../utils/rgb';

class SecondaryColour {
  public constructor(private readonly handle: number) {}

  public get isCustom(): boolean {
    return GetIsVehiclePrimaryColourCustom(this.handle);
  }

  public get custom(): RGB {
    const [ r, g, b ] = GetVehicleCustomSecondaryColour(this.handle);
    return { r, g, b };
  }

  public set custom(v: RGB) {
    SetVehicleCustomSecondaryColour(this.handle, v.r, v.g, v.b);
  }
}

class PrimaryColor {
  public constructor(private readonly handle: number) {}

  public get isCustom(): boolean {
    return GetIsVehiclePrimaryColourCustom(this.handle);
  }

  public get custom(): RGB {
    const [ r, g, b ] = GetVehicleCustomPrimaryColour(this.handle);
    return { r, g, b };
  }

  public set custom(v: RGB) {
    SetVehicleCustomPrimaryColour(this.handle, v.r, v.g, v.b);
  }
}

class DashboardColor {
  public constructor(private readonly handle: number) {}

  public get(): number {
    return GetVehicleDashboardColour(this.handle);
  }
}

export class VehicleColour {
  public constructor(private readonly handle: number) {}

  public get(): [number, number] {
    return GetVehicleColours(this.handle);
  }

  public get secondary(): SecondaryColour {
    return new SecondaryColour(this.handle);
  }

  public get primary(): PrimaryColor {
    return new PrimaryColor(this.handle);
  }

  public get dashboard(): DashboardColor {
    return new DashboardColor(this.handle);
  }

  public get extra(): [number, number] {
    return GetVehicleExtraColours(this.handle);
  }

  public set colourCombination(value: number) {
    SetVehicleColourCombination(this.handle, value);
  }

  public set colours(value: [number, number]) {
    SetVehicleColours(this.handle, value[0], value[1]);
  }
}
