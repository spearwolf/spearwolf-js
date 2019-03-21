
export const pick = names => obj => {
  let newObj = null;
  if (obj) {
    names.forEach((key) => {
      const val = obj[key];
      if (val !== undefined) {
        if (newObj === null) {
          newObj = {};
        }
        newObj[key] = val;
      }
    });
  }
  return newObj;
};
