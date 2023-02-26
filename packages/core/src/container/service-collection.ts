import { IServiceCollection, IServiceProvider, Factory, ProviderType, TypeOf } from '../types';
import { Container, decorate, injectable } from 'inversify';

class ServiceProvider implements IServiceProvider {
  private readonly _container: Container;

  public constructor(container: Container) {
    this._container = container;
  }

  public get<T>(key: string): T {
    return this.has(key) ? this._container.get<T>(key) : undefined;
  }

  public getAll<T>(key: string): T[] {
    return this.has(key) ? this._container.getAll<T>(key) : [];
  }

  public has(key: string): boolean {
    return this._container.isBound(key);
  }
}

export class ServiceCollection implements IServiceCollection {
  private readonly _container = new Container({
    defaultScope: 'Singleton',
    skipBaseClassChecks: true,
    autoBindInjectable: false,
  });

  private _provider: IServiceProvider;

  public add<T>(key: unknown, provider: ProviderType<T>): IServiceCollection {
    if (typeof provider === 'function') {
      // class
      this.tryDecorate(provider as TypeOf<T>);
      this._container
        .bind(key as never)
        .to(provider as never)
        .inSingletonScope();
    } else {
      // instance
      this._container.bind(key as never).toConstantValue(provider);
    }
    return this;
  }

  public addFactory<T>(key: unknown, factory: Factory<T>): IServiceCollection {
    this._container
      .bind(key as never)
      .toDynamicValue((ctx) => {
        const target = ctx.currentRequest.parentRequest?.bindings[0].implementationType;
        return factory(this._provider, target as TypeOf<unknown>);
      })
      .inRequestScope();
    return this;
  }

  public has(key: string): boolean {
    return this._container.isBound(key);
  }

  public remove(key: string): IServiceCollection {
    this._container.unbind(key);
    return this;
  }

  public build(): IServiceProvider {
    if (!this._provider) {
      this._provider = new ServiceProvider(this._container);
    }
    return this._provider;
  }

  private tryDecorate<T>(target: TypeOf<T>): void {
    try {
      decorate(injectable(), target);
    } catch (e) {}
  }
}
