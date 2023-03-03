import { ILogger } from './logger.interface';
import { IServiceProvider, TypeOf } from '../../types';

export interface ILoggingFactory {
  createLogger(provider: IServiceProvider, parent: TypeOf<unknown>): ILogger
}