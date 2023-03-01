import {
  ApplicationBuilder,
  ChatCommand,
  Controller,
  Export, Fn, IBinder,
  LocalEvent,
  NetEvent,
  Reflector,
  TypeOf
} from '@vxjs-fivem/core';
import {
  ChatCommandBinder,
  ExportBinder, GUARDS_TAG,
  IPlatformProvider,
  LocalEventBinder,
  NetEventBinder, NuiActiveGuard, PLATFORM_PROVIDER
} from '@vxjs-fivem/client/src';

describe('Binders', () => {
  const CONTROLLER_TAG = '00a54152-d339-490c-8122-ac4e73c513fb';
  const chatCommandName = 'chatCommandName';
  const exportName = 'exportName';
  const localEventName = 'localEventName';
  const netEventName = 'netEventName';

  class PlatformProvider implements IPlatformProvider {
    public emit = jest.fn();
    public export = jest.fn();
    public emitNet = jest.fn();
    public on = jest.fn();
    public onChat = jest.fn();
    public onNet = jest.fn();

  }

  @Controller('TestController')
  class TestController {
    @ChatCommand(chatCommandName, false)
    public onChatCommand(): void {
      return null;
    }

    @Export(exportName)
    public onExport(): void {
      return null;
    }

    @LocalEvent(localEventName)
    public onLocalEvent(): void {
      return null;
    }

    @NetEvent(netEventName)
    public onNetEvent(): void {
      return null;
    }
  }

  const testBinder = async (
    binder: TypeOf<IBinder>,
    mock: keyof PlatformProvider,
  ): Promise<void> => {
    const provider = new PlatformProvider();
    const builder = new ApplicationBuilder();
    builder.services.add(PLATFORM_PROVIDER, provider);
    builder.services.add(GUARDS_TAG, new NuiActiveGuard(''));

    builder.addBinder(binder);
    builder.addController(TestController);

    const app = builder.build();
    await app.start();

    const controller = app.provider.get<TestController>(CONTROLLER_TAG);

    expect(provider[mock]).toBeCalledTimes(1);
  };

  it('should bind chat command', async () => {
    await testBinder(ChatCommandBinder, 'onChat');
  });

  it('should bind export', async () => {
    await testBinder(ExportBinder, 'export');
  });

  it('should bind local event', async () => {
    await testBinder(LocalEventBinder, 'on');
  });

  it('should bind net event', async () => {
    await testBinder(NetEventBinder, 'onNet');
  });

});