import { IServiceProvider } from '../container.type';

export interface IApplication {
  provider: IServiceProvider;
  start(): Promise<void>;
}
