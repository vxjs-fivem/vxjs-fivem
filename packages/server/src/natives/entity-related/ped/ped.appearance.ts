import { PedClothing } from './ped.clothing';
import { PedDecoration } from './ped.decoration';

export class PedAppearance {
  constructor(private readonly handle: number) {}

  public get clothing(): PedClothing {
    return new PedClothing(this.handle);
  }

  public get decoration(): PedDecoration {
    return new PedDecoration(this.handle);
  }

  public set eyeColor(index: number) {
    SetPedEyeColor(this.handle, index);
  }

  public setFaceFeature(index: number, scale: number): void {
    SetPedFaceFeature(this.handle, index, scale);
  }

  public setHairColor(primary: number, secondary: number): void {
    SetPedHairColor(this.handle, primary, secondary);
  }

  public setHeadBlendData(
    shapeFirstID: number,
    shapeSecondID: number,
    shapeThirdID: number,
    skinFirstID: number,
    skinSecondID: number,
    skinThirdID: number,
    shapeMix: number,
    skinMix: number,
    thirdMix: number,
    isParent: boolean,
  ): void {
    SetPedHeadBlendData(
      this.handle,
      shapeFirstID,
      shapeSecondID,
      shapeThirdID,
      skinFirstID,
      skinSecondID,
      skinThirdID,
      shapeMix,
      skinMix,
      thirdMix,
      isParent,
    );
  }

  public setHeadOverlay(
    overlayID: number,
    index: number,
    opacity: number,
  ): void {
    SetPedHeadOverlay(this.handle, overlayID, index, opacity);
  }

  public setHeadOverlayColor(
    overlayID: number,
    colorType: number,
    colorID: number,
    secondColorID: number,
  ): void {
    SetPedHeadOverlayColor(
      this.handle,
      overlayID,
      colorType,
      colorID,
      secondColorID,
    );
  }
}
