export abstract class Server {
  public static set isPrivate(value: boolean) {
    FlagServerAsPrivate(value);
  }

  public static get isServer(): boolean {
    return !!IsDuplicityVersion();
  }
}
