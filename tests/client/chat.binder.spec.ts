import { ApplicationBuilder, ChatCommand, Controller } from '@vxjs-fivem/core';
import { ClientModule } from '@vxjs-fivem/client/src';

describe('Chat Binder', () => {

  it('should register a non-guarded chat command', async () => {
    const commandName = 'chatCommand';
    @Controller()
    class TestController {
      @ChatCommand('commandName')
      public onCatCommand(): void {
        return null;
      }
    }

    jest.spyOn(TestController.prototype, 'onCatCommand');
    TestController.prototype.onCatCommand = jest.fn();

    const builder = new ApplicationBuilder().addModule(new ClientModule());

  });
});