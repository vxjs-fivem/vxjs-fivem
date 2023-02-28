import { IGuard } from '../core';
import { EventContext } from '../../context';

export class NuiActiveGuard implements IGuard {
  private readonly _fieldName: string;

  public constructor(fieldName: string) {
    this._fieldName = fieldName;
  }

  public canActivate(context: EventContext): boolean {
    return !!context.target[this._fieldName];
  }
}
