import { Entity } from './entity';
import { VehicleSeat } from '../enums';
import { VehicleBody } from '../entity-related/vehicle/vehicle.body';
import { VehicleSeat as VS } from '../entity-related/vehicle/vehicle.seat';
import { VehicleColour } from '../entity-related/vehicle/vehicle.colour';
import { VehicleDirt } from '../entity-related/vehicle/vehicle.dirt';
import { VehicleDoors } from '../entity-related/vehicle/vehicle.doors';
import { VehicleEngine } from '../entity-related/vehicle/vehicle.engine';
import { VehicleInterior } from '../entity-related/vehicle/vehicle.interior';
import { VehicleLight } from '../entity-related/vehicle/vehicle.light';
import { VehicleWeapon } from '../entity-related/vehicle/vehicle.weapon';
import { VehiclePetrolTank } from '../entity-related/vehicle/vehicle.petrolTank';
import { VehicleLivery } from '../entity-related/vehicle/vehicle.livery';
import { VehicleWheel } from '../entity-related/vehicle/vehicle.wheel';
import { VehicleWindow } from '../entity-related/vehicle/vehicle.window';
import { VehicleAlarm } from '../entity-related/vehicle/vehicle.alarm';

export class Vehicle extends Entity {
  constructor(handle: number) {
    super(handle);
  }

  public static get all(): Vehicle[] {
    return GetAllVehicles().map((el: number) => new Vehicle(el));
  }

  public get landingGearState(): number {
    return GetLandingGearState(this.handle);
  }

  public get body(): VehicleBody {
    return new VehicleBody(this.handle);
  }

  public getSeat(index: VehicleSeat): VS {
    return new VS(this.handle, index);
  }

  public get colour(): VehicleColour {
    return new VehicleColour(this.handle);
  }

  public get dirt(): VehicleDirt {
    return new VehicleDirt(this.handle);
  }

  public get doors(): VehicleDoors {
    return new VehicleDoors(this.handle);
  }

  public get engine(): VehicleEngine {
    return new VehicleEngine(this.handle);
  }

  //TODO remove _
  public get isHandbrakeOn(): boolean {
    return GetVehicleHandbrake(this.handle);
  }

  public get interior(): VehicleInterior {
    return new VehicleInterior(this.handle);
  }

  public get light(): VehicleLight {
    return new VehicleLight(this.handle);
  }

  public get livery(): VehicleLivery {
    return new VehicleLivery(this.handle);
  }

  public get weapon(): VehicleWeapon {
    return new VehicleWeapon(this.handle);
  }

  public get tank(): VehiclePetrolTank {
    return new VehiclePetrolTank(this.handle);
  }

  public get wheels(): VehicleWheel {
    return new VehicleWheel(this.handle);
  }

  public get windows(): VehicleWindow {
    return new VehicleWindow(this.handle);
  }

  public get hasBeenOwnedByAPlayer(): boolean {
    return HasVehicleBeenOwnedByPlayer(this.handle);
  }

  public get alarm(): VehicleAlarm {
    return new VehicleAlarm(this.handle);
  }
}
