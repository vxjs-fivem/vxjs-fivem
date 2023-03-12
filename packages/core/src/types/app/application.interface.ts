import { IServiceProvider } from '../container.type';
import { TypeOf } from '../common';
import { ILogger } from '../../core';

export interface IApplication {
  provider: IServiceProvider;
  getLoggerFor<T>(type: TypeOf<T> | string): ILogger
  start(): void;
}
