export class Train {
  public constructor(public readonly handle: number) {}

  public get carriageEngine(): number {
    return GetTrainCarriageEngine(this.handle);
  }

  public get carriageIndex(): number {
    return GetTrainCarriageIndex(this.handle);
  }
}
