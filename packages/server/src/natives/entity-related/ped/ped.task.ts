import { Ped } from '../../entity';
import { Vehicle } from '../../entity';
import { Vector3 } from '../../utils';
import {
  VehicleEnteringFlag,
  VehicleEnteringSpeed,
  VehicleSeat,
} from '../../enums';
import { Entity } from '../../entity/entity';

export class PedTask {
  constructor(private readonly handle: number) {}

  public clearSecondary(): void {
    ClearPedSecondaryTask(this.handle);
  }

  public clearTasks(isImmediately = false): void {
    if (isImmediately) {
      ClearPedTasksImmediately(this.handle);
    } else {
      ClearPedTasks(this.handle);
    }
  }

  public get scriptCommand(): number {
    return GetPedScriptTaskCommand(this.handle);
  }

  public get scriptStage(): number {
    return GetPedScriptTaskStage(this.handle);
  }

  public getSpecificType(index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7): number {
    return GetPedSpecificTaskType(this.handle, index);
  }

  public fightPed(target: Ped): void {
    TaskCombatPed(this.handle, target.handle, 0, 16);
  }

  public driveBy(
    target: Ped,
    targetVehicle: Vehicle,
    targetPos: Vector3,
    distanceToShoot: number,
    pedAccuracy: number,
    firingPattern: string | number,
  ): void {
    TaskDriveBy(
      this.handle,
      target.handle,
      targetVehicle.handle,
      targetPos.x,
      targetPos.y,
      targetPos.z,
      distanceToShoot,
      pedAccuracy,
      true,
      firingPattern,
    );
  }

  public enterVehicle(
    target: Vehicle,
    timeout: number,
    seat: VehicleSeat,
    speed: VehicleEnteringSpeed,
    flag: VehicleEnteringFlag,
  ): void {
    TaskEnterVehicle(this.handle, target.handle, timeout, seat, speed, flag, 0);
  }

  public go(
    pos: Vector3,
    speed: number,
    timeout: number,
    heading: number,
    distanceToSlide: number,
  ): void {
    TaskGoStraightToCoord(
      this.handle,
      pos.x,
      pos.y,
      pos.z,
      speed,
      timeout,
      heading,
      distanceToSlide,
    );
  }

  public goToEntity(
    target: Entity,
    duration: number,
    distance: number,
    speed: number,
  ): void {
    TaskGoToEntity(
      this.handle,
      target.handle,
      duration,
      distance,
      speed,
      1073741824,
      0,
    );
  }

  public goByAnyMeans(pos: Vector3, speed: number, walkingStyle: number): void {
    TaskGoToCoordAnyMeans(
      this.handle,
      pos.x,
      pos.y,
      pos.z,
      speed,
      0,
      false,
      walkingStyle,
      0xbf800000,
    );
  }

  public handsUp(duration: number, target?: Ped): void {
    TaskHandsUp(this.handle, duration, target?.handle || 0, -1, true);
  }

  public leaveVehicle(flag: VehicleEnteringFlag, veh?: Vehicle): void {
    if (veh) {
      TaskLeaveVehicle(this.handle, veh.handle, flag);
    } else {
      TaskLeaveAnyVehicle(this.handle, 1, flag);
    }
  }

  public playAnim(
    animDictionary: string,
    animationName: string,
    blendInSpeed: number,
    blendOutSpeed: number,
    duration: number,
    flag: number,
    playbackRate: number,
    lockX: boolean,
    lockY: boolean,
    lockZ: boolean,
  ): void {
    TaskPlayAnim(
      this.handle,
      animDictionary,
      animationName,
      blendInSpeed,
      blendOutSpeed,
      duration,
      flag,
      playbackRate,
      lockX,
      lockY,
      lockZ,
    );
  }

  public playAnimAdvanced(
    animDict: string,
    animName: string,
    pos: Vector3,
    rot: Vector3,
    animEnterSpeed: number,
    animExitSpeed: number,
    duration: number,
    flag: number,
    animTime: number,
    p14: number,
    p15: number,
  ): void {
    TaskPlayAnimAdvanced(
      this.handle,
      animDict,
      animName,
      pos.x,
      pos.y,
      pos.z,
      rot.x,
      rot.y,
      rot.z,
      animEnterSpeed,
      animExitSpeed,
      duration,
      flag,
      animTime,
      p14,
      p15,
    );
  }

  public reactAndFlee(target: Entity): void {
    TaskReactAndFleePed(this.handle, target.handle);
  }

  public shootAt(
    pos: Vector3,
    duration: number,
    pattern: string | number,
  ): void;
  public shootAt(
    target: Entity,
    duration: number,
    pattern: string | number,
  ): void;
  public shootAt(
    posOrTarget: Vector3 | Entity,
    duration: number,
    pattern: string | number,
  ): void {
    if (posOrTarget instanceof Entity) {
      TaskShootAtEntity(this.handle, posOrTarget.handle, duration, pattern);
    } else {
      TaskShootAtCoord(
        this.handle,
        posOrTarget.x,
        posOrTarget.y,
        posOrTarget.z,
        duration,
        pattern,
      );
    }
  }

  public warpIntoVehicle(veh: Vehicle, seat: VehicleSeat): void {
    TaskWarpPedIntoVehicle(this.handle, veh.handle, seat);
  }
}
