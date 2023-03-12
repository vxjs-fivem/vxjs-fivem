export abstract class Profiler {
  public static enterScope(scope: string): void {
    return ProfilerEnterScope(scope);
  }

  public static exitScope(): void {
    return ProfilerExitScope();
  }

  public static get isRecording(): boolean {
    return ProfilerIsRecording();
  }
}
