import { Vector3 } from '../utils/vector3';

export class PlayerWanted {
  public constructor(private source: string) {}

  public clear(): void {
    ClearPlayerWantedLevel(this.source);
  }

  public get level(): number {
    return GetPlayerWantedLevel(this.source);
  }

  public set level(v: number) {
    SetPlayerWantedLevel(this.source, v, false);
  }

  public get fakeLevel(): number {
    return GetPlayerFakeWantedLevel(this.source);
  }

  public get timeInPursuit(): number {
    return GetPlayerTimeInPursuit(this.source, false);
  }

  public get lastTimeInPursuit(): number {
    return GetPlayerTimeInPursuit(this.source, true);
  }

  public get centrePosition(): Vector3 {
    const [ x, y, z ] = GetPlayerWantedCentrePosition(this.source);
    return new Vector3(x, y, z);
  }

  public get isEvading(): boolean {
    return IsPlayerEvadingWantedLevel(this.source);
  }
}
