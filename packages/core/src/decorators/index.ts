import { inject, multiInject, optional, tagged } from 'inversify';

export * from './handlers';
export * from './handler-decorator.factory';
export * from './controller.decorator';
export * from './providers';

export const Inject = inject;
export const InjectMany = multiInject;
export const Optional = optional;

export const Metadata = tagged;
