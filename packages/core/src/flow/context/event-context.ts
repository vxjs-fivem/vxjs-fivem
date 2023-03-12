import { IEventRequest } from './event-request.interface';
import { IEventResponse } from './event-response.interface';

export interface IEventContext {
  readonly request: IEventRequest;
  readonly response: IEventResponse;
  /*Name of the triggered event*/
  readonly name: string;
  /*Kind of the triggered event*/
  readonly kind: string;
  /*Target controller*/
  readonly target: unknown;
  /*Target controller method name*/
  readonly methodName: string;
  /*Can be anything*/
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly metadata: { [p: string]: any };
}