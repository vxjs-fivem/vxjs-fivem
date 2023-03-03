import { Reflector } from '../metadata';
import { CoreMetadata } from '../application';

export const Controller =
  (name?: string): ClassDecorator =>
    (target) => {
      Reflect.defineMetadata(CoreMetadata.Controller, {
        name: name ?? target.name.replace('Controller', ''),
      }, Reflector.getClass(target));
    };

