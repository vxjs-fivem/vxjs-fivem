import { ApplicationBuilder, Controller, NetEvent, Reflector } from '@vxjs-fivem/core';
import { ClientModule } from '@vxjs-fivem/client/src';
import { TestPlatformProvider } from './utils';

describe('Net Event Binder', () => {
  const eventName = 'Some Net Event Name';
  @Controller()
  class TestController {
    @NetEvent(eventName)
    public onNetEventHandler(): void {
      return null;
    }
    @NetEvent(eventName)
    public onNetEventHandler2(): void {
      return null;
    }
  }

  it('should register a net event', async () => {
    const provider = new TestPlatformProvider();
    const module = new ClientModule(provider);
    const controller = new TestController();
    const builder = new ApplicationBuilder()
      .addController(controller)
      .addModule(module);

    const app = builder.build();

    await app.start();

    expect(provider.onNet).toBeCalledTimes(2);

    expect(provider.onNet).toBeCalledWith(eventName, Reflector.bindMethod(controller, 'onNetEventHandler'));
    expect(provider.onNet).toBeCalledWith(eventName, Reflector.bindMethod(controller, 'onNetEventHandler2'));

  });
});