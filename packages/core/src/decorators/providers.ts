import { inject, tagged } from 'inversify';
import { CONFIG, EXPORT, LOGGER } from '../core';

export const InjectConfig = (path?: string): PropertyDecorator & ParameterDecorator =>
  (target, propertyKey, parameterIndex?) => {
    inject(CONFIG)(target, propertyKey, parameterIndex);
    if (path) {
      tagged('configPath', path)(target, propertyKey, parameterIndex);
    }
  };

export const InjectExport = (resource: string, method?: string): PropertyDecorator & ParameterDecorator =>
  (target, propertyKey, parameterIndex?) => {
    inject(EXPORT)(target, propertyKey, parameterIndex);
    tagged('resource', resource)(target, propertyKey, parameterIndex);
    if (method) {
      tagged('method', method)(target, propertyKey, parameterIndex);
    }
  };

export const InjectLogger = (name?: string): PropertyDecorator & ParameterDecorator =>
  (target, propertyKey, parameterIndex?) => {
    inject(LOGGER)(target, propertyKey, parameterIndex);
    if (name) {
      tagged('name', name)(target, propertyKey, parameterIndex);
    }
  };