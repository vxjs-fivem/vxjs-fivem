import { IPlatformProvider } from '@vxjs-fivem/client/src';

export class TestPlatformProvider implements IPlatformProvider {
  public on = jest.fn();
  public emit = jest.fn();
  public onNet = jest.fn();
  public emitNet = jest.fn();
  public onExport = jest.fn();
  public callExport = jest.fn();
  public onChat = jest.fn();
  public emitChat = jest.fn();
}