export class PedDecoration {
  constructor(private handle: number) {}

  public addDecorationFromHashes(
    collection: string | number,
    overlay: string | number,
  ): void {
    AddPedDecorationFromHashes(this.handle, collection, overlay);
  }
}
