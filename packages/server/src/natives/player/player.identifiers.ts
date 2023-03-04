export class PlayerIdentifiers {
  public readonly steam: string = null;
  public readonly license: string = null;
  public readonly discord: string = null;
  public readonly fivem: string = null;
  public readonly ip: string = null;

  public constructor(source: string) {
    getPlayerIdentifiers(source).forEach((el) => {
      const [key, value] = el.split(':');
      if (key in this) {
        this[key] = value;
      }
    });
  }
}
