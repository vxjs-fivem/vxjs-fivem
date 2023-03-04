import { PlayerCamera } from './player.camera';
import { PlayerWanted } from './player.wanted';
import { PlayerIdentifiers } from './player.identifiers';
import { PlayerState } from './player.state';
import { Ped } from '../entity';

export class Player {
  public readonly source: string;
  public constructor(source: string | number) {
    this.source = source.toString();
  }

  public static getFromIndex(index: number): Player {
    const p = GetPlayerFromIndex(index);
    return p && new Player(p);
  }

  public static get all(): Player[] {
    return getPlayers().map((src) => new Player(src));
  }

  public get wanted(): PlayerWanted {
    return new PlayerWanted(this.source);
  }

  public get canStartCommerceSession(): boolean {
    return CanPlayerStartCommerceSession(this.source);
  }

  public doesOwnSKU(skuID: number, isEXT = false): boolean {
    if (isEXT) {
      return DoesPlayerOwnSkuExt(this.source, skuID);
    } else {
      return DoesPlayerOwnSku(this.source, skuID);
    }
  }

  public hasCommerceInfoLoaded(isExt = false): boolean {
    if (isExt) {
      return IsPlayerCommerceInfoLoadedExt(this.source);
    } else {
      return IsPlayerCommerceInfoLoaded(this.source);
    }
  }

  public drop(reason: string): void {
    DropPlayer(this.source, reason);
  }

  // public banTemporary(reason: string): void {
  //   TempBanPlayer(this.source, reason);
  // }

  public get camera(): PlayerCamera {
    return new PlayerCamera(this.source);
  }

  // GetAirDragMultiplierForPlayersVehicle

  public get tokens(): string[] {
    return new Array(GetNumPlayerTokens(this.source)).fill(0).map((el, i) => {
      return GetPlayerToken(this.source, i);
    });
  }

  public get endpoint(): string {
    return GetPlayerEndpoint(this.source);
  }

  public get guid(): string {
    return GetPlayerGuid(this.source);
  }

  public get identifiers(): PlayerIdentifiers {
    return new PlayerIdentifiers(this.source);
  }

  public get isInvincible(): boolean {
    return GetPlayerInvincible(this.source);
  }

  public set isInvincible(v: boolean) {
    SetPlayerInvincible(this.source, v);
  }

  public get lastMessage(): number {
    return GetPlayerLastMsg(this.source);
  }

  public get state(): PlayerState {
    return new PlayerState(this.source);
  }

  public get ped(): Ped {
    return new Ped(GetPlayerPed(this.source));
  }

  public get name(): string {
    return GetPlayerName(this.source);
  }

  public get ping(): number {
    return GetPlayerPing(this.source);
  }

  public get routingBucket(): number {
    return GetPlayerRoutingBucket(this.source);
  }

  public set routingBucket(v: number) {
    SetPlayerRoutingBucket(this.source, v);
  }

  public get team(): number {
    return GetPlayerTeam(this.source);
  }

  public get isUsingSuperJump(): boolean {
    return IsPlayerUsingSuperJump(this.source);
  }

  public setControl(isEnabled: boolean, flag: number): void {
    SetPlayerControl(this.source, isEnabled, flag);
  }

  public set cullingRadius(v: number) {
    SetPlayerCullingRadius(this.source, v);
  }

  public get isOnline(): boolean {
    return getPlayers().includes(this.source);
  }

  public set model(model: string | number) {
    SetPlayerModel(this.source, model);
  }

  public emit(eventName: string, ...payload: unknown[]): void {
    TriggerClientEvent(eventName, this.source, ...payload);
  }
}
