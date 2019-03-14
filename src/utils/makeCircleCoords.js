
const DEG2RAD = Math.PI / 180.0;

export default (steps, radius = 1, callback = undefined) => {
  const halfRadius = 0.5 * radius;
  const delta = 360.0 / steps;
  const arr = [];

  for (let i = 0, deg = 0; i < steps; i++) {

    const rad = deg * DEG2RAD;
    const x = halfRadius * Math.sin(rad);
    const y = halfRadius * Math.cos(rad);

    arr.push([x, y]);

    if (callback) {
      // eslint-disable-next-line callback-return
      callback(x, y, i / steps);
    }

    deg += delta;
  }

  return arr;
};
