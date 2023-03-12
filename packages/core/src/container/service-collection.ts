import { IServiceCollection, IServiceProvider, Factory, ProviderType, TypeOf, ContainerKeyType } from '../types';
import { Container, decorate, injectable } from 'inversify';

class ServiceProvider implements IServiceProvider {
  private readonly _container: Container;

  public constructor(container: Container) {
    this._container = container;
  }

  public get<T>(key: ContainerKeyType): T {
    return this.has(key) ? this._container.get<T>(key) : undefined;
  }

  public getAll<T>(key: ContainerKeyType): T[] {
    return this.has(key) ? this._container.getAll<T>(key) : [];
  }

  public has(key: ContainerKeyType): boolean {
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

  public add<T>(key: ContainerKeyType, provider: ProviderType<T>): IServiceCollection {
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

  public addFactory<T>(key: ContainerKeyType, factory: Factory<T>): IServiceCollection {
    this._container
      .bind(key as never)
      .toDynamicValue((ctx) => {
        const target = ctx.currentRequest.parentRequest?.bindings[0]?.implementationType as TypeOf<unknown>;
        const property = ctx.currentRequest.target?.identifier as string;
        const metadata = ctx.currentRequest.target?.metadata.filter(x => x.key !== 'inject').reduce((acc, curr) => {
          acc[curr.key as string] = curr.value;
          return acc;
        }, {}) as unknown as Record<string, unknown>;
        return factory(this._provider, {
          target,
          property: property,
          metadata
        });
      })
      .inRequestScope();
    return this;
  }

  public has(key: ContainerKeyType): boolean {
    return this._container.isBound(key);
  }

  public remove(key: ContainerKeyType): IServiceCollection {
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
