export interface ILogger {
  log(message: string): void;
  error(error: Error, message?: string): void;
  info(message: string): void;
  debug(message: string): void;
}