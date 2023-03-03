import { createHandlerDecorator } from '@vxjs-fivem/core';

type ResourceEventInput = [name: string, once?: boolean]
type ResourceEventOutput = {name: string, once?: boolean}

export const ResourceEvent =
  createHandlerDecorator<ResourceEventInput, { name: string }>('RESOURCE_EVENT', (name) => ({ name }));
