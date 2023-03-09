import { IConfigService, ILogger, ILoggingFactory } from '../core';
import { IServiceProvider, TypeOf } from '../types';

interface Colors  {
  Orange:  string;
  Green:  string;
  Yellow:  string;
  Blue:  string;
  LightBlue:  string;
  Purple:  string;
  Reset:  string;
  Red:  string;
}

const ClientColors = {
  Orange: '^1',
  Green: '^2',
  Yellow: '^3',
  Blue: '^4',
  LightBlue: '^5',
  Purple: '^6',
  Reset: '^7',
  Red: '^9'
};

const ServerColors = {
  Orange: '\x1b[33m',
  Green: '\x1b[32m',
  Yellow: '\x1b[93m',
  Blue: '\x1b[34m',
  LightBlue: '\x1b[94m',
  Purple: '\x1b[35m',
  Reset: '\x1b[0m',
  Red: '\x1b[31m',
};

class Logger implements ILogger {
  private readonly _context: string;
  private readonly _colors: Colors;

  public constructor(context: string, colors: Colors) {
    this._context = context;
    this._colors = colors;
  }

  public debug(message: string): void {
    this.write(this._colors.LightBlue, 'DEBUG', message);
  }

  public error(error: Error, message?: string): void {
    if (message) {
      this.write(this._colors.Red, 'ERROR', message);
    }
    this.write(this._colors.Red, 'ERROR', error.message);
    this.write(this._colors.Red, 'ERROR', error.stack);
  }

  public info(message: string): void {
    this.write(this._colors.Green, ' INFO', message);
  }

  public log(message: string): void {
    this.write(this._colors.Blue, '  LOG', message);
  }

  private write(color: string, prefix: string, message: string): void {
    const ts = new Date().toLocaleString('uk')
      .replaceAll('.', '-');

    console.log(color + `[${prefix}] [${ts}] - ${message}` + this._colors.Reset);

  }
}

export class LoggingFactory implements ILoggingFactory {
  private readonly _colors: Colors;

  public constructor(config: IConfigService) {
    const side = config.getOrThrow<'CLIENT' | 'SERVER'>('side');
    this._colors = side === 'CLIENT' ? ClientColors : ServerColors;
  }

  public createLogger(provider: IServiceProvider, parent: TypeOf<unknown>): ILogger {
    const name = parent?.name ?? '[APPLICATION]';
    return new Logger(name, this._colors);
  }
}
