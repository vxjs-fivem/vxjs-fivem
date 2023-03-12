import { ProviderType } from '../../types';
import { IRequestFilter, IResponseFilter } from './request-filter.interface';
import { Reflector } from '../../metadata';

const REQUEST_FILTER_KEY = Symbol('REQUEST_FILTER');
const RESPONSE_FILTER_KEY = Symbol('RESPONSE_FILTER');

export const UseFilters =
  (...filters: ProviderType<IRequestFilter | IResponseFilter>[]): ClassDecorator & MethodDecorator =>
    (target, method?: string) => {
      const requestFilters: ProviderType<IRequestFilter>[] = [];
      const responseFilters: ProviderType<IResponseFilter>[] = [];

      filters.forEach(x => {
        const type = Reflector.getClass(x);
        if (type.prototype.onExecuting) {
          requestFilters.push(x as ProviderType<IRequestFilter>);
        }
        if (type.prototype.onExecuted) {
          responseFilters.push(x as ProviderType<IResponseFilter>);
        }
      });
      const targetClass = Reflector.getClass(target);
      Reflect.defineMetadata(REQUEST_FILTER_KEY, requestFilters, targetClass, method);
      Reflect.defineMetadata(RESPONSE_FILTER_KEY, responseFilters, targetClass, method);
    };

UseFilters.getFilters =
  (target: unknown, method?: string): [ProviderType<IRequestFilter>[], ProviderType<IResponseFilter>[]] => {
    const targetClass = Reflector.getClass(target);
    const classRequestFilters = Reflect.getMetadata(REQUEST_FILTER_KEY, targetClass) ?? [];
    const classResponseFilters = Reflect.getMetadata(RESPONSE_FILTER_KEY, targetClass) ?? [];

    if (method) {
      classRequestFilters.push(...(Reflect.getMetadata(REQUEST_FILTER_KEY, targetClass, method) ?? []));
      classResponseFilters.push(...(Reflect.getMetadata(RESPONSE_FILTER_KEY, targetClass, method) ?? []));
    }

    return [ classRequestFilters, classResponseFilters ];
  };