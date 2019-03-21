
export const unpick = names => obj => {
  let newObj = null;
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (!names.includes(key)) {
        const val = obj[key];
        if (val !== undefined) {
          if (newObj === null) {
            newObj = {};
          }
          newObj[key] = val;
        }
      }
    });
  }
  return newObj;
};
