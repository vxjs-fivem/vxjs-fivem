import { PlayerPart } from './player.part';

export class PlayerCommerceData extends PlayerPart {
  public load(isExt = false): void {
    if (isExt) {
      LoadPlayerCommerceDataExt(this.source);
    } else {
      LoadPlayerCommerceData(this.source);
    }
  }

  public requestSession(skuID: number): void {
    RequestPlayerCommerceSession(this.source, skuID);
  }
}
