/** @private */
export const toArray = descriptor => function (scalars) {
  const arr = [];
  const attrList = Array.isArray(scalars)
    ? scalars.map(name => descriptor.attr[name])
    : descriptor.attrList;
  const len = attrList.length;

  for (let i = 0; i < descriptor.vertexCount; ++i) {
    for (let j = 0; j < len; ++j) {
      const attr = attrList[j];
      for (let k = 0; k < attr.size; ++k) {
        arr.push(attr.getValue(this, i, k));
      }
    }
  }
  return arr;
};
