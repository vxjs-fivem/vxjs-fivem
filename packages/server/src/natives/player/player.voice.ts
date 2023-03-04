import { PlayerPart } from './player.part';

export class PlayerVoice extends PlayerPart {
  public get voiceProximityOverride(): number[] {
    return NetworkGetVoiceProximityOverride(this.source);
  }
}
