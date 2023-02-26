import { Reflector } from '../metadata/reflector';

export const Controller =
  (name?: string): ClassDecorator =>
  (target) => {
    Reflector.setClassMetadata(target, 'CONTROLLER', {
      name: name ?? target.name.replace('Controller', ''),
    });
  };
