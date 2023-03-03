import { ApplicationBuilder, Controller, LocalEvent, Reflector } from '@vxjs-fivem/core';
import { ClientModule } from '@vxjs-fivem/client/src';
import { TestPlatformProvider } from './utils';

describe('Local Event Binder', () => {
  const eventName = 'Some Event Name';
  @Controller()
  class TestController {
    @LocalEvent(eventName)
    public onLocalEventHandler(): void {
      return null;
    }
    @LocalEvent(eventName)
    public onLocalEventHandler2(): void {
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

    expect(provider.on).toBeCalledTimes(2);

    expect(provider.on).toBeCalledWith(eventName, Reflector.bindMethod(controller, 'onLocalEventHandler'));
    expect(provider.on).toBeCalledWith(eventName, Reflector.bindMethod(controller, 'onLocalEventHandler2'));

  });
});