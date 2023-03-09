import {
  ApplicationBuilder,
  Controller,
  IApplicationBuilder,
  IAsyncModule,
  IBinder,
  IDynamicModule,
  Inject,
  IPlatformProvider,
  sleep,
} from '@vxjs-fivem/core/src';

describe('App Builder', function () {
  class Provider implements IPlatformProvider {
    public onChatCommand = jest.fn();
    public onExport = jest.fn();
    public onLocalEvent = jest.fn();
    public onNetEvent = jest.fn();
  }

  it('should create an app', () => {
    const builder = new ApplicationBuilder(new Provider());
    const app = builder.build();
    expect(app).toBeDefined();
  });

  it('should not start the app due to no controllers', async () => {
    const builder = new ApplicationBuilder(new Provider());

    const app = builder.build();

    await expect(app.start()).rejects.toThrow('Could not start the app. No controllers were found.');
  });

  it('should start the app with dynamic module', async () => {
    class ServiceClass {}

    @Controller()
    class ControllerClass {
      @Inject(ServiceClass)
      public readonly service: ServiceClass;
    }

    const binder = new (class Binder implements IBinder {
      public bind = jest.fn();
    })();

    class Module implements IDynamicModule {
      public load(builder: IApplicationBuilder): void {
        builder.addController(ControllerClass);
        builder.services.add(ServiceClass, ServiceClass);
        builder.addBinder(binder);
        builder.addBinder(binder);
      }
    }

    const builder = new ApplicationBuilder(new Provider());

    const app = builder.addModule(new Module()).build();

    await app.start();

    const controllers = app.provider.getAll<ControllerClass>('00a54152-d339-490c-8122-ac4e73c513fb');

    expect(binder.bind).toBeCalledTimes(1);
    expect(controllers).toHaveLength(1);
    expect(controllers[0]).toBeInstanceOf(ControllerClass);
    expect(controllers[0].service).toBeInstanceOf(ServiceClass);
  });

  it('should start the app with async module', async () => {
    class ServiceClass {}
    @Controller()
    class ControllerClass {
      @Inject(ServiceClass)
      public readonly service: ServiceClass;
    }

    const binder = new (class Binder implements IBinder {
      public bind = jest.fn();
    })();

    class AsyncModule implements IAsyncModule {
      public async loadAsync(builder: IApplicationBuilder): Promise<void> {
        builder.addController(ControllerClass);
        builder.services.add(ServiceClass, ServiceClass);
        builder.addBinder(binder);
        await sleep(500);
      }
    }

    const builder = new ApplicationBuilder(new Provider());

    const app = builder.addModule(new AsyncModule()).build();

    await app.start();

    const controllers = app.provider.getAll<ControllerClass>('00a54152-d339-490c-8122-ac4e73c513fb');

    expect(binder.bind).toBeCalledTimes(1);
    expect(controllers).toHaveLength(1);
    expect(controllers[0]).toBeInstanceOf(ControllerClass);
    expect(controllers[0].service).toBeInstanceOf(ServiceClass);
  });
});
