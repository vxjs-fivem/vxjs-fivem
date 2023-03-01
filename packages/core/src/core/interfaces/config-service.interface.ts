export interface IConfigService {
  get<T>(key: string): T;

  getOrDefault<T>(key: string, defaultValue: T): T;

  getOrThrow<T>(key: string): T;
}
