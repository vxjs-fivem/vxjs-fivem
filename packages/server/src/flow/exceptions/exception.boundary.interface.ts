import { NetContext } from '../context';

export interface IExceptionBoundary {
  handle(context: NetContext, exception: Error): void;
}
