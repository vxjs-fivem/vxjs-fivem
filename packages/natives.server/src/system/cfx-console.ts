export abstract class CfxConsole {
  public static get buffer(): string {
    return GetConsoleBuffer();
  }

  public static registerListener(
    callback: (...args: unknown[]) => unknown,
  ): void {
    RegisterConsoleListener(callback);
  }
}
