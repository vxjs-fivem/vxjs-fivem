import { IConfigService, ILogger, ILoggingFactory } from '../core';
import { IServiceProvider, TypeOf } from '../types';
import * as console from 'console';

class Logger implements ILogger {
  private readonly _context: string;
  public constructor(context: string) {
    this._context = context;
  }

  public debug(message: string): void {
    console.log(`[DEBUG] ${message}`);
  }

  public error(error: Error, message?: string): void {
    if (message) {
      console.error(message, error);
    } else {
      console.error(error);
    }
  }

  public info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  public log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

export class LoggingFactory implements ILoggingFactory {
  private readonly config: IConfigService;
  public createLogger(provider: IServiceProvider, parent: TypeOf<unknown>): ILogger {
    const name = parent?.name ?? '[APPLICATION]';
    return new Logger(name);
  }
}
