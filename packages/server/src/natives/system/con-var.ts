export abstract class ConVar {
  public static get(name: string, defaultValue = ''): string {
    return GetConvar(name, defaultValue);
  }

  public static getINT(name: string, defaultValue = 0): number {
    return GetConvarInt(name, defaultValue);
  }

  public set(name: string, value: string, isReplicated = false): void {
    if (isReplicated) {
      SetConvarReplicated(name, value);
    } else {
      SetConvar(name, value);
    }
  }

  public setServerInfo(name: string, value: string): void {
    SetConvarServerInfo(name, value);
  }
}
