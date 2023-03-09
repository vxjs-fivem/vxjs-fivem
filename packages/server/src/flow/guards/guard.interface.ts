import { NetContext } from '../context';

export interface IGuard {
  canActivate(context: NetContext): boolean | Promise<boolean>;
}
