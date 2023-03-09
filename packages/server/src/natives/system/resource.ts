export class Resource {
  public constructor(public readonly name: string) {}

  public getAmountOfMetadata(key: string): number {
    return GetNumResourceMetadata(this.name, key);
  }

  public getMetadata(key: string, index: number): string {
    return GetResourceMetadata(this.name, key, index);
  }

  public get path(): string {
    return GetResourcePath(this.name);
  }

  public loadFile(file: string): string {
    return LoadResourceFile(this.name, file);
  }

  public saveFile(file: string, data: string): boolean {
    return SaveResourceFile(this.name, file, data, data.length);
  }

  public registerAsset(pathToAsset: string): string {
    return RegisterResourceAsset(this.name, pathToAsset);
  }

  public start(): boolean {
    return StartResource(this.name);
  }

  public stop(): boolean {
    return StopResource(this.name);
  }

  public static byIndex(index: number): void | Resource {
    const r = GetResourceByFindIndex(index);
    return r ? new Resource(r) : void 0;
  }

  public static get current(): Resource {
    return new Resource(GetCurrentResourceName());
  }

  public static get invoker(): Resource {
    const r = GetInvokingResource();
    return r ? new Resource(r) : null;
  }

  public static get amount(): number {
    return GetNumResources();
  }

  public static registerAsEventHandler(eventName: string): void {
    return RegisterResourceAsEventHandler(eventName);
  }

  public static registerBuildTaskFactory(
    id: string,
    callback: (...args: unknown[]) => unknown,
  ): void {
    RegisterResourceBuildTaskFactory(id, callback);
  }

  public static scheduleTick(name: string): void {
    ScheduleResourceTick(name);
  }
}
