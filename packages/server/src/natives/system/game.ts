export abstract class Game {
  public static getName(): string {
    return GetGameName();
  }

  public static get timer(): number {
    return GetGameTimer();
  }

  public static get build(): number {
    return GetGameBuildNumber();
  }

  public static set type(type: string) {
    SetGameType(type);
  }
}
