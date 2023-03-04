import { Entity } from './';
import { PedAppearance, PedTask } from '../entity-related/ped';
import { PedWeapon } from '../entity-related/ped/ped.weapon';
import { Vehicle } from './vehicle';
import { PedRagdoll } from '../entity-related/ped/ped.ragdoll';
import { VehicleSeat } from '../enums';

export class Ped extends Entity {
  constructor(handle: number) {
    super(handle);
  }

  public static get all(): Ped[] {
    return GetAllPeds().map(el => new Ped(el));
  }

  public get isPlayer(): boolean {
    return IsPedAPlayer(this.handle);
  }

  public get appearance(): PedAppearance {
    return new PedAppearance(this.handle);
  }

  public get task(): PedTask {
    return new PedTask(this.handle);
  }

  public get armour(): number {
    return GetPedArmour(this.handle);
  }
  public get desiredHeading(): number {
    return GetPedDesiredHeading(this.handle);
  }

  public get maxHealth(): number {
    return GetPedMaxHealth(this.handle);
  }

  public get causeOfDeath(): Entity {
    const ent = GetPedCauseOfDeath(this.handle);
    return ent !== 0 && Entity.byType(ent);
  }

  public get sourceOfDamage(): Entity {
    const ent = GetPedSourceOfDamage(this.handle);
    return ent !== 0 && Entity.byType(ent);
  }

  public get sourceOfDeath(): Entity {
    const ent = GetPedSourceOfDeath(this.handle);
    return ent !== 0 && Entity.byType(ent);
  }

  public get weapon(): PedWeapon {
    return new PedWeapon(this.handle);
  }

  public get vehicle(): Vehicle {
    const v = GetVehiclePedIsIn(this.handle, false);
    return v && new Vehicle(this.handle);
  }

  public set vehicle(veh: Vehicle) {
    SetPedIntoVehicle(this.handle, veh.handle, VehicleSeat.Driver);
  }

  public get lastVehicle(): Vehicle {
    const v = GetVehiclePedIsIn(this.handle, true);
    return v && new Vehicle(this.handle);
  }

  public get ragdoll(): PedRagdoll {
    return new PedRagdoll(this.handle);
  }

  public setConfigFlag(flag: number, value: boolean): void {
    SetPedConfigFlag(this.handle, flag, value);
  }

  public setIntoVehicle(vehicle: Vehicle, index: VehicleSeat): void {
    SetPedIntoVehicle(this.handle, vehicle.handle, index);
  }

  public setResetFlag(flag: number, shouldReset: boolean): void {
    SetPedResetFlag(this.handle, flag, shouldReset);
  }
}
