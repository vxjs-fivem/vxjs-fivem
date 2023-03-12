import { IEventContext } from '../context';

export interface IGuard {
  canActivate(context: IEventContext): boolean | Promise<boolean>
}