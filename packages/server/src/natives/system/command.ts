export class Command {
  constructor(public readonly name: string) {}

  public execute(): void {
    ExecuteCommand(this.name);
  }

  public static all(): Command[] {
    return GetRegisteredCommands().map(
      (el: { name: string }) => new Command(el.name),
    );
  }

  public register(
    callback: (...args: unknown[]) => unknown,
    isRestricted = false,
  ): void {
    RegisterCommand(this.name, callback, isRestricted);
  }
}
