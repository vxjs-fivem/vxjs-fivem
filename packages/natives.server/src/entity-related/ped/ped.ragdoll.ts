import { PedPart } from './ped.part';
import { Vector3 } from '../../utils/vector3';

export class PedRagdoll extends PedPart {
  public set isEnabled(value: boolean) {
    SetPedCanRagdoll(this.handle, value);
  }

  public set(
    time1: number,
    time2: number,
    ragdollType: number,
    p4: boolean,
    p5: boolean,
    p6: boolean,
  ): void {
    SetPedToRagdoll(this.handle, time1, time2, ragdollType, p4, p5, p6);
  }

  public setWithFall(
    time: number,
    p2: number,
    ragdollType: number,
    pos: Vector3,
    p7: number,
    p8: number,
    p9: number,
    p10: number,
    p11: number,
    p12: number,
    p13: number,
  ): void {
    SetPedToRagdollWithFall(
      this.handle,
      time,
      p2,
      ragdollType,
      pos.x,
      pos.y,
      pos.z,
      p7,
      p8,
      p9,
      p10,
      p11,
      p12,
      p13,
    );
  }
}
