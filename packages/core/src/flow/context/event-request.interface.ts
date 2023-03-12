export interface IEventRequest {
  /*Passed arguments, should be untouched.*/
  readonly passedArguments: readonly unknown[];
  /*Final arguments, can modify*/
  readonly finalArguments: unknown[];
}
