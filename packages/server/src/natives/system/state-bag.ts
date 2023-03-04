export class StateBag {
  constructor(public readonly name: string) {}

  public get<T = unknown>(key: string): T {
    return GetStateBagValue(this.name, key);
  }

  public set(
    bag: string,
    key: string,
    value: string,
    isReplicated = false,
  ): void {
    SetStateBagValue(bag, key, value, value.length, isReplicated);
  }
}
