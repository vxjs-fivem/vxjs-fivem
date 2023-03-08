import { ILogger, ILoggingFactory, IServiceProvider, TypeOf } from '@vxjs-fivem/core';
import * as console from 'console';

const enum Colors {
  Reset = '\x1b[0m',

  FgBlack = '\x1b[30m',
  FgRed = '\x1b[31m',
  FgGreen = '\x1b[32m',
  FgYellow = '\x1b[33m',
  FgBlue = '\x1b[34m',
  FgMagenta = '\x1b[35m',
  FgCyan = '\x1b[36m',
  FgWhite = '\x1b[37m',
  FgGray = '\x1b[90m',
}

class ConsoleLogger implements ILogger {
  public constructor(private readonly _context: string) {}
  public debug(message: string): void {
    this.write(Colors.FgBlue, 'DEBUG', message);
  }

  public error(error: Error, message?: string): void {
    if (message) {
      this.write(Colors.FgRed, 'ERROR', message);
    }
    this.write(Colors.FgRed, 'ERROR', error.toString());
  }

  public info(message: string): void {
    this.write(Colors.FgBlue, ' INFO', message);
  }

  public log(message: string): void {
    this.write(Colors.FgGreen, '  LOG', message);
  }

  private write(color: Colors, prefix: string, message: string): void {
    const ts = new Date().toLocaleString('uk')
      .replaceAll('.', '-');

    console.log(color + `[${prefix}] [${ts}] - ${message}` + Colors.Reset);

  }
}

export class LoggerFactory implements ILoggingFactory {
  public createLogger(provider: IServiceProvider, parent: TypeOf<unknown>): ILogger {
    const prefix = parent?.name ?? '';
    return new ConsoleLogger(prefix);
  }
}
