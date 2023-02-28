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
import { ChatCommandBinder, ExportBinder, LocalEventBinder, NetEventBinder } from '@vxjs-fivem/client/src';

describe('Binders', () => {
  const CONTROLLER_TAG = '00a54152-d339-490c-8122-ac4e73c513fb';
  const chatCommandName = 'chatCommandName';
  const exportName = 'exportName';
  const localEventName = 'localEventName';
  const netEventName = 'netEventName';

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
    method: string, mock: ReturnType<typeof jest.fn>,
    expected: (bound: Fn) => unknown[]): Promise<void> => {
    const builder = new ApplicationBuilder();

    builder.addBinder(binder);
    builder.addController(TestController);

    const app = builder.build();
    await app.start();

    const controller = app.provider.get<TestController>(CONTROLLER_TAG);
    const bound = Reflector.bindMethod(controller, method);

    expect(mock).toBeCalledTimes(1);

    expect(mock)
      .toHaveBeenCalledWith(...expected(bound));

  };

  it('should bind chat command', async () => {
    global.RegisterCommand = jest.fn();
    await testBinder(ChatCommandBinder, 'onChatCommand', global.RegisterCommand as never, (bound) => ([
      chatCommandName, bound, false
    ]));
    delete global.RegisterCommand;
  });

  it('should bind export', async () => {
    global.exports = jest.fn();
    await testBinder(ExportBinder, 'onExport', global.exports as never, (bound) => ([
      exportName, bound
    ]));
    delete global.exports;
  });

  it('should bind local event', async () => {
    global.on = jest.fn();
    await testBinder(LocalEventBinder, 'onLocalEvent', global.on as never, (bound) => ([
      localEventName, bound
    ]));
    delete global.on;
  });

  it('should bind net event', async () => {
    global.onNet = jest.fn();
    await testBinder(NetEventBinder, 'onNetEvent', global.onNet as never, (bound) => ([
      netEventName, bound
    ]));
    delete global.onNet;
  });

});