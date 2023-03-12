export class PedWeapon {
  public constructor(private readonly handle: number) {}

  public get selected(): number {
    return GetSelectedPedWeapon(this.handle);
  }

  public giveComponent(
    weaponHash: string | number,
    componentHash: string | number,
  ): void {
    return GiveWeaponComponentToPed(this.handle, weaponHash, componentHash);
  }

  public give(
    weaponHash: string | number,
    ammo: number,
    isHidden = true,
    shouldForceInHand: false,
  ): void {
    return GiveWeaponToPed(
      this.handle,
      weaponHash,
      ammo,
      isHidden,
      shouldForceInHand,
    );
  }

  public removeAll(): void {
    RemoveAllPedWeapons(this.handle, true);
  }

  public removeComponent(
    weaponHash: string | number,
    componentHash: string | number,
  ): void {
    RemoveWeaponComponentFromPed(this.handle, weaponHash, componentHash);
  }

  public remove(weaponHash: string | number): void {
    RemoveWeaponFromPed(this.handle, weaponHash);
  }

  public set current(value: string | number) {
    SetCurrentPedWeapon(this.handle, value, true);
  }

  public setAmmo(hash: string | number, ammo: number): void {
    SetPedAmmo(this.handle, hash, ammo);
  }
}
