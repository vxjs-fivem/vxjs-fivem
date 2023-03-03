import { ApplicationBuilder, Controller, Export, Reflector } from '@vxjs-fivem/core';
import { ClientModule } from '@vxjs-fivem/client/src';
import { TestPlatformProvider } from './utils';

describe('Net Event Binder', () => {
  const exportName = 'Some Export Name';
  @Controller()
  class TestController {
    @Export(exportName)
    public export1(): void {
      return null;
    }
    @Export(exportName)
    public export2(): void {
      return null;
    }
  }

  it('should register an export', async () => {
    const provider = new TestPlatformProvider();
    const module = new ClientModule(provider);
    const controller = new TestController();
    const builder = new ApplicationBuilder()
      .addController(controller)
      .addModule(module);

    const app = builder.build();

    await app.start();

    expect(provider.onExport).toBeCalledTimes(2);

    expect(provider.onExport).toBeCalledWith(exportName, Reflector.bindMethod(controller, 'export1'));
    expect(provider.onExport).toBeCalledWith(exportName, Reflector.bindMethod(controller, 'export2'));

  });
});