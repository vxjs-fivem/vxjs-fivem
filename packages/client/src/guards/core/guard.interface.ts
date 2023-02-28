import { EventContext } from '../../context';

export interface IGuard {
  canActivate(context: EventContext): boolean | Promise<boolean>;
}
