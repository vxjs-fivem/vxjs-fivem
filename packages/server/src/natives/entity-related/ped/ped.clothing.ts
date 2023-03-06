export class PedClothing {
  public constructor(private readonly handle: number) {}

  public setComponentVariation(
    componentId: number,
    drawableId: number,
    textureId: number,
    paletteId: number,
  ): void {
    SetPedComponentVariation(
      this.handle,
      componentId,
      drawableId,
      textureId,
      paletteId,
    );
  }

  public setDefaultComponentVariation(): void {
    SetPedDefaultComponentVariation(this.handle);
  }

  public setRandomComponentVariation(): void {
    SetPedRandomComponentVariation(this.handle, 0);
  }

  public clearProp(propID: number): void {
    ClearPedProp(this.handle, propID);
  }

  public setPropIndex(
    componentId: number,
    drawableId: number,
    textureId: number,
    attach = true,
  ): void {
    SetPedPropIndex(this.handle, componentId, drawableId, textureId, attach);
  }

  public setRandomProps(): void {
    SetPedRandomProps(this.handle);
  }
}
