import { RoutingBucketEntityLockdownMode } from '../enums/routing-bucket';

export class RoutingBucket {
  public constructor(public readonly id: number) {}

  public set lockdownMode(mode: RoutingBucketEntityLockdownMode) {
    SetRoutingBucketEntityLockdownMode(this.id, mode);
  }

  public set isPopulationEnabled(value: boolean) {
    SetRoutingBucketPopulationEnabled(this.id, value);
  }
}
