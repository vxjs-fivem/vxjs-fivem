import { IEventContext } from '../context';

export interface IExceptionFilter<TException extends Error> {
  catch(context: IEventContext, exception: TException): void
}