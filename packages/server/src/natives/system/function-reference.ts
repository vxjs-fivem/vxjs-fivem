export abstract class FunctionReference {
  public static delete(identity: string): void {
    return DeleteFunctionReference(identity);
  }

  public static duplicate(identity: string): string {
    return DuplicateFunctionReference(identity);
  }

  public static invoke(
    identity: string,
    args: string,
    argsLen = args.length,
    retvalLength?: number,
  ): [string, number] {
    return InvokeFunctionReference(identity, args, argsLen, retvalLength);
  }
}
