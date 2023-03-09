import { Vector3 } from '../utils';
import { Blip } from '../hud';
import { EntityBone } from '../enums';
import { Ped, Vehicle, Prop } from './';

export abstract class Entity {
  protected constructor(public readonly handle: number) {}

  public set position(pos: Vector3) {
    SetEntityCoords(this.handle, pos.x, pos.y, pos.z, false, false, false, false);
  }

  public get position(): Vector3 {
    const [ x, y, z ] = GetEntityCoords(this.handle);
    return new Vector3(x, y, z);
  }

  public set heading(heading: number) {
    SetEntityHeading(this.handle, heading);
  }

  public get heading(): number {
    return GetEntityHeading(this.handle);
  }

  public set rotation(rot: Vector3) {
    SetEntityRotation(this.handle, rot.x, rot.y, rot.z, 2, false);
  }

  public get rotation(): Vector3 {
    const [ x, y, z ] = GetEntityRotation(this.handle);
    return new Vector3(x, y, z);
  }

  public set routingBucket(bucket: number) {
    SetEntityRoutingBucket(this.handle, bucket);
  }

  public get routingBucket(): number {
    return GetEntityRoutingBucket(this.handle);
  }

  public set velocity(velocity: Vector3) {
    SetEntityVelocity(this.handle, velocity.x, velocity.y, velocity.z);
  }

  public addBlip(): Blip {
    return new Blip(AddBlipForEntity(this.handle));
  }

  public applyForce(
    forceType: number,
    forceVector: Vector3,
    offset: Vector3,
    boneIndex: EntityBone,
    isDirectionRel: boolean,
    ignoreUpVec: boolean,
    isForceRel: boolean
  ): void {
    ApplyForceToEntity(
      this.handle,
      forceType,
      forceVector.x,
      forceVector.y,
      forceVector.z,
      offset.x,
      offset.y,
      offset.z,
      boneIndex,
      isDirectionRel,
      ignoreUpVec,
      isForceRel,
      true,
      true
    );
  }

  public delete(): void {
    DeleteEntity(this.handle);
  }

  public get doesExist(): boolean {
    return DoesEntityExist(this.handle);
  }

  public ensureStateBag(): void {
    EnsureEntityStateBag(this.handle);
  }

  public get state(): StateBagInterface {
    return global.Entity(this.handle).state;
  }

  public set isPositionFrozen(freeze: boolean) {
    FreezeEntityPosition(this.handle, freeze);
  }

  public get health(): number {
    return GetEntityHealth(this.handle);
  }

  public get maxHealth(): number {
    return GetEntityMaxHealth(this.handle);
  }

  public get model(): number {
    return GetEntityModel(this.handle);
  }

  public get populationType(): number {
    return GetEntityPopulationType(this.handle);
  }

  public get rotationVelocity(): Vector3 {
    const [ x, y, z ] = GetEntityRotationVelocity(this.handle);
    return new Vector3(x, y, z);
  }

  public get script(): string {
    return GetEntityScript(this.handle);
  }

  public get type(): number {
    return GetEntityType(this.handle);
  }

  public get hasBeenMarkedAsNoLongerNeeded(): boolean {
    return HasEntityBeenMarkedAsNoLongerNeeded(this.handle);
  }

  public get isVisible(): boolean {
    return IsEntityVisible(this.handle);
  }

  public set distanceCullingRadius(radius: number) {
    SetEntityDistanceCullingRadius(this.handle, radius);
  }

  public static byType(ent: number): Entity {
    if (ent) {
      switch (GetEntityType(ent)) {
      case 0:
        return null;
      case 1:
        return new Ped(ent);
      case 2:
        return new Vehicle(ent);
      case 3:
        return new Prop(ent);
      }
    }
  }

  public static fromNetworkID(netId: number): Entity {
    const ent = NetworkGetEntityFromNetworkId(netId);
    return ent && Entity.byType(ent);
  }

  public get ownerId(): number {
    return NetworkGetEntityOwner(this.handle);
  }

  public get firstOwnerId(): number {
    return NetworkGetFirstEntityOwner(this.handle);
  }

  public get netID(): number {
    return NetworkGetNetworkIdFromEntity(this.handle);
  }
}
