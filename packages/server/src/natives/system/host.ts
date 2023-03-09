export abstract class Host {
  public set isSupportEnhanced(value: boolean) {
    EnableEnhancedHostSupport(value);
  }

  public get id(): string {
    return GetHostId();
  }

  public static get instance(): number {
    return GetInstanceId();
  }
}
