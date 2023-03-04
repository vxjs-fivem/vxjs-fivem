export abstract class Password {
  public generate(password: string): string {
    return GetPasswordHash(password);
  }

  public verify(password: string, hash: string): boolean {
    return VerifyPasswordHash(password, hash);
  }
}
