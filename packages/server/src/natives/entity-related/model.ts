export class Model {
  constructor(public readonly model: string, private _hash: number) {}

  public get hash(): number {
    if (!this._hash) {
      this._hash = GetHashKey(this.model);
    }
    return this._hash;
  }
}
