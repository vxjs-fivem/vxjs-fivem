export abstract class Kvp {
  public static set(key: string, value: string): void {
    SetResourceKvp(key, value);
  }

  public static setAsync(key: string, value: string): void {
    SetResourceKvpNoSync(key, value);
  }

  public static setInt(key: string, value: number): void {
    SetResourceKvpInt(key, value);
  }

  public static setIntAsync(key: string, value: number): void {
    SetResourceKvpIntNoSync(key, value);
  }

  public static setFloat(key: string, value: number): void {
    SetResourceKvpInt(key, value);
  }

  public static setFloatAsync(key: string, value: number): void {
    SetResourceKvpIntNoSync(key, value);
  }

  public static delete(key: string): void {
    DeleteResourceKvp(key);
  }

  public static deleteAsync(key: string): void {
    DeleteResourceKvpNoSync(key);
  }

  public static stopSearch(handle: number): void {
    return EndFindKvp(handle);
  }

  public static startFind(prefix: string): number {
    return StartFindKvp(prefix);
  }

  public static find(handle: number): string {
    return FindKvp(handle);
  }

  public static flush(): void {
    return FlushResourceKvp();
  }

  public static getFloat(key: string): number {
    return GetResourceKvpFloat(key);
  }

  public static getInt(key: string): number {
    return GetResourceKvpInt(key);
  }

  public static getString(key: string): string {
    return GetResourceKvpString(key);
  }
}
