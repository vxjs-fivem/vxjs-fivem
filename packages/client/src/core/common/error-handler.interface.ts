import { EventContext } from '../../context';

export interface IErrorHandler<T extends Error> {
  handle(context: EventContext, error: T): void | Promise<void>
}