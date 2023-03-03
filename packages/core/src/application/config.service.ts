import get from 'lodash.get';
import { IConfigService } from '../core';

export class ConfigService implements IConfigService {
  private readonly _storage: Record<string, unknown>;

  public constructor(storage: Record<string, unknown>) {
    this._storage = storage;
  }

  public get<T>(key: string): T {
    return get(this._storage, key) as T;
  }

  public getOrDefault<T>(key: string, defaultValue: T): T {
    return get(this._storage, key, defaultValue) as T;
  }

  public getOrThrow<T>(key: string): T {
    const value = this.get<T>(key);
    if (!value) {
      throw new Error(`Config value for ${key} is not found`);
    }
    return value;
  }
}