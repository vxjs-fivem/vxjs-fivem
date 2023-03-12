export abstract class Ace {
  public static isAllowed(obj: string): boolean {
    return IsAceAllowed(obj);
  }

  public static isPrincipalAllowed(principal: string, obj: string): boolean {
    return IsPrincipalAceAllowed(principal, obj);
  }
}
