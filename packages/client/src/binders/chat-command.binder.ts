import { ChatCommand, Inject, InjectMany, Reflector } from '@vxjs-fivem/core';
import { IPlatformProvider, PlatformProvider } from '../core';
import { GuardedBinder } from './guarded-binder';
import { GUARDS_TAG, IGuard } from '../guards';

export class ChatCommandBinder extends GuardedBinder {
  @Inject(PlatformProvider)
  private readonly provider: IPlatformProvider;

  public static typeTransformers = new Map<unknown, (v: string) => unknown>([
    [ Number, Number ],
    [ String, String ],
    [ Boolean, (v): boolean => v === 'true' || v === '1' ],
    [ Object, (x): unknown => x ],
  ]);

  public constructor(@InjectMany(GUARDS_TAG) guards: IGuard[]) {
    super(guards);
  }

  public bind(controller: unknown): void {
    const metadata = ChatCommand.getMetadata(controller);

    metadata.forEach(({ method, value }) => {
      const params = Reflect.getMetadata('design:paramtypes', Reflector.getClass(controller).prototype, method);
      const argsTransformer = (_args: unknown[]): unknown[] => {
        const args = _args[1] as unknown[];

        const transformed = params.map((x, idx) => {
          const transformer = ChatCommandBinder.typeTransformers.get(x);
          return args[idx] ? transformer?.(args[idx] as string) : null;
        });

        if (transformed.length < args.length) {
          transformed.push(...args.slice(transformed.length));
        }

        return transformed;
      };

      const handler = this.guardHandler(controller, method, value.name, 'chat', argsTransformer);
      this.provider.onChat(value.name, handler, value.isRestricted);
    });
  }
}
