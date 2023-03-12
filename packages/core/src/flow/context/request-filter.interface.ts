import { IEventContext } from './';

export interface IRequestFilter {
  onExecuting(context: IEventContext): Promise<void>;
}

export interface IResponseFilter {
  onExecuted(context: IEventContext): Promise<void>;
}