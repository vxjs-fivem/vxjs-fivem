export class PlayerWeapon {
  public constructor(private readonly source: string) {}

  public get meleeDamageModifier(): number {
    return GetPlayerMeleeWeaponDamageModifier(this.source);
  }

  public get damageModifier(): number {
    return GetPlayerWeaponDamageModifier(this.source);
  }

  public get defenceModifier(): number {
    return GetPlayerWeaponDefenseModifier(this.source);
  }

  public get defenceModifier2(): number {
    return GetPlayerWeaponDefenseModifier_2(this.source);
  }
}
