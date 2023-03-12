export class RequestAbortedException extends Error {
  public constructor(message: string) {
    super(message);
  }
}