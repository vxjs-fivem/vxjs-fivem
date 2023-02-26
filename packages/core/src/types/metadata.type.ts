export type MetadataKind = 'class' | 'method' | 'property' | 'parameter';

export type ClassMetadataType<T> = {
  kind: 'class';
  value: T;
};

export type MethodMetadataType<T> = {
  kind: 'method';
  method: string;
  value: T;
};

export type PropertyMetadataType<T> = {
  kind: 'method';
  property: string;
  value: T;
};

export type ParameterMetadataType<T> = {
  kind: 'parameter';
  method: string;
  index: number;
  value: T;
};

export type SharedMetadataType<T> =
  | ClassMetadataType<T>
  | MethodMetadataType<T>
  | PropertyMetadataType<T>
  | ParameterMetadataType<T>;
