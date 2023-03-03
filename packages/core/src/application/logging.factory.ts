import { IConfigService, ILogger, ILoggingFactory } from '../core';
import { IServiceProvider, TypeOf } from '../types';

class Logger implements ILogger {
  private readonly _context: string;
  public constructor(context: string) {
    this._context = context;
  }

  public debug(message: string): void {
  }

  public error(error: Error, message?: string): void {
  }

  public info(message: string): void {
  }

  public log(message: string): void {
  }

}

export class LoggingFactory implements ILoggingFactory {
  private readonly config: IConfigService;
  public createLogger(provider: IServiceProvider, parent: TypeOf<unknown>): ILogger {
    const name = parent?.name ?? '[APPLICATION]';
    return new Logger(name);
  }
}