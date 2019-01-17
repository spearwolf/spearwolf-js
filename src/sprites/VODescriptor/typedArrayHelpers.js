/** @private */
export const BYTES_PER_ELEMENT = {
  float32: 4,
  int16: 2,
  int32: 4,
  int8: 1,
  uint16: 2,
  uint32: 4,
  uint8: 1,
};

/** @private */
export const TYPED_ARRAY_CONSTRUCTOR = {
  float32: Float32Array,
  int16: Int16Array,
  int32: Int32Array,
  int8: Int8Array,
  uint16: Uint16Array,
  uint32: Uint32Array,
  uint8: Uint8Array,
};

/** @private */
export const TYPED_ARRAY_GETTER = {
  float32: obj => obj.float32Array,
  int32: obj => obj.int32Array,
  int16: obj => obj.int16Array,
  int8: obj => obj.int8Array,
  uint32: obj => obj.uint32Array,
  uint16: obj => obj.uint16Array,
  uint8: obj => obj.uint8Array,
};

/** @private */
export const GL_ITEM_TYPES = {
  float32: 'FLOAT',
  int16: 'SHORT',
  int32: 'INT',
  int8: 'BYTE',
  uint16: 'UNSIGNED_SHORT',
  uint32: 'UNSIGNED_INT',
  uint8: 'UNSIGNED_BYTE',
};
