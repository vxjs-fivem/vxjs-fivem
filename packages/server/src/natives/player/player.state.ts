export class PlayerState {
  constructor(private readonly source: string) {}

  public get maxArmour(): number {
    return GetPlayerMaxArmour(this.source);
  }

  public get maxHealth(): number {
    return GetPlayerMaxHealth(this.source);
  }

  public get bag(): StateBagInterface {
    return global.Player(this.source).state;
  }
}
