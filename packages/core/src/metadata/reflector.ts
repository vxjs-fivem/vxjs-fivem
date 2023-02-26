import { ClassMetadataType, Fn, MethodMetadataType, ProviderType, SharedMetadataType, TypeOf } from '../types';

export class Reflector {
  private static _metadataBackingFiled = 'METADATA_BACKING_FIELD';
  private static _boundMethodsMetadataKey = 'BOUND_METHODS';
  private static _customMetadataKey = 'CUSTOM_METADATA';
  public static getClass<T>(target: ProviderType<T>): TypeOf<T> {
    return (typeof target === 'function' ? target : target.constructor) as TypeOf<T>;
  }

  public static bindMethod<TTarget>(target: TTarget, method: string): Fn {
    target[this._metadataBackingFiled] ??= {};
    target[this._metadataBackingFiled][this._boundMethodsMetadataKey] ??= {};
    target[this._metadataBackingFiled][this._boundMethodsMetadataKey][method] ??= target[method].bind(target);
    return target[this._metadataBackingFiled][this._boundMethodsMetadataKey][method];
  }

  public static setClassMetadata<TTarget, TValue>(target: TTarget, key: string, value: TValue): void {
    const metadata: ClassMetadataType<TValue> = {
      kind: 'class',
      value,
    };
    this.getCustomMetadata(target, key).push(metadata);
  }

  public static setMethodMetadata<TTarget, TValue>(
    target: ProviderType<TTarget>,
    method: string,
    key: string,
    value: TValue
  ): void {
    const metadata: MethodMetadataType<TValue> = {
      method,
      kind: 'method',
      value,
    };
    this.getCustomMetadata(target, key).push(metadata);
  }

  public static getCustomMetadata<TTarget, TValue>(
    target: ProviderType<TTarget>,
    key: string
  ): SharedMetadataType<TValue>[] {
    const ctor = this.getClass(target);
    ctor[this._metadataBackingFiled] ??= {};
    ctor[this._metadataBackingFiled][this._customMetadataKey] ??= {};
    ctor[this._metadataBackingFiled][this._customMetadataKey][key] ??= [];
    return ctor[this._metadataBackingFiled][this._customMetadataKey][key];
  }

  public static getCustomClassMetadata<TTarget, TValue>(
    target: ProviderType<TTarget>,
    key: string
  ): ClassMetadataType<TValue>[] {
    return this.getCustomMetadata(target, key).filter((x) => x.kind === 'class') as ClassMetadataType<TValue>[];
  }

  public static getCustomMethodMetadata<TTarget, TValue>(
    target: ProviderType<TTarget>,
    key: string
  ): MethodMetadataType<TValue>[] {
    return this.getCustomMetadata(target, key).filter((x) => x.kind === 'method') as MethodMetadataType<TValue>[];
  }
}
