import { inject, multiInject } from 'inversify';

export * from './handlers';
export * from './handler-decorator.factory';
export * from './controller.decorator';

export const Inject = inject;
export const InjectMany = multiInject;
