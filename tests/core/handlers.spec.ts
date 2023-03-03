import { ApplicationBuilder, IBinder, NetEvent, LocalEvent, Controller, IPlatformProvider } from '@vxjs-fivem/core/src';

describe('Handlers', function () {
  class Provider implements IPlatformProvider {
    public onChatCommand = jest.fn();
    public onExport = jest.fn();
    public onLocalEvent = jest.fn();
    public onNetEvent = jest.fn();
  }

  it('should bind net events', async function () {
    @Controller()
    class ControllerClass {
      @NetEvent('netEvent')
      public netEvent(): void {
        return null;
      }
    }

    const binder = new (class NetEventBinder implements IBinder {
      public bind(controller: unknown): void {
        const metadata = NetEvent.getMetadata(controller);
        expect(metadata).toHaveLength(1);
        expect(metadata[0].value).toStrictEqual({ name: 'netEvent' });
        expect(metadata[0].method).toBe('netEvent');
        expect(metadata[0].kind).toBe('method');
      }
    })();

    const builder = new ApplicationBuilder(new Provider());

    builder.addController(ControllerClass);
    builder.addBinder(binder);

    await builder.build().start();

    expect(true).toBe(true);
  });

  it('should bind local events', async function () {
    @Controller()
    class ControllerClass {
      @LocalEvent('localEvent')
      public localEvent(): void {
        return null;
      }
    }

    const binder = new (class LocalEventBinder implements IBinder {
      public bind(controller: unknown): void {
        const metadata = LocalEvent.getMetadata(controller);
        expect(metadata).toHaveLength(1);
        expect(metadata[0].value).toStrictEqual({ name: 'localEvent' });
        expect(metadata[0].method).toBe('localEvent');
        expect(metadata[0].kind).toBe('method');
      }
    })();

    const builder = new ApplicationBuilder(new Provider());

    builder.addController(ControllerClass);
    builder.addBinder(binder);

    await builder.build().start();

    expect(true).toBe(true);
  });

  it('should bind local and net events', async function () {
    @Controller()
    class ControllerClass {
      @LocalEvent('localEvent')
      public localEvent(): void {
        return null;
      }

      @NetEvent('netEvent')
      public netEvent(): void {
        return null;
      }
    }

    const netBinder = new (class NetEventBinder implements IBinder {
      public bind(controller: unknown): void {
        const metadata = NetEvent.getMetadata(controller);
        expect(metadata).toHaveLength(1);
        expect(metadata[0].value).toStrictEqual({ name: 'netEvent' });
        expect(metadata[0].method).toBe('netEvent');
        expect(metadata[0].kind).toBe('method');
      }
    })();

    const localBinder = new (class LocalEventBinder implements IBinder {
      public bind(controller: unknown): void {
        const metadata = LocalEvent.getMetadata(controller);
        expect(metadata).toHaveLength(1);
        expect(metadata[0].value).toStrictEqual({ name: 'localEvent' });
        expect(metadata[0].method).toBe('localEvent');
        expect(metadata[0].kind).toBe('method');
      }
    })();

    const builder = new ApplicationBuilder(new Provider());

    builder.addController(ControllerClass);
    builder.addBinder(localBinder);
    builder.addBinder(netBinder);

    await builder.build().start();

    expect(true).toBe(true);
  });

  it('should bind two same type events', async function () {
    @Controller()
    class ControllerClass {
      @LocalEvent('localEvent1')
      public localEventMethod1(): void {
        return null;
      }
      @LocalEvent('localEvent2')
      public localEventMethod2(): void {
        return null;
      }
    }

    const binder = new (class LocalEventBinder implements IBinder {
      public bind(controller: unknown): void {
        const metadata = LocalEvent.getMetadata(controller);
        expect(metadata).toHaveLength(2);
        expect(metadata[0].value).toStrictEqual({ name: 'localEvent1' });
        expect(metadata[0].method).toBe('localEventMethod1');
        expect(metadata[0].kind).toBe('method');

        expect(metadata[1].value).toStrictEqual({ name: 'localEvent2' });
        expect(metadata[1].method).toBe('localEventMethod2');
        expect(metadata[1].kind).toBe('method');
      }
    })();

    const builder = new ApplicationBuilder(new Provider());

    builder.addController(ControllerClass);
    builder.addBinder(binder);

    await builder.build().start();

    expect(true).toBe(true);
  });
});
