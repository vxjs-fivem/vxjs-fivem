import { EventContext } from '../../context';

export interface IErrorBoundary {
  handle(context: EventContext, error: Error): Promise<void>;
}