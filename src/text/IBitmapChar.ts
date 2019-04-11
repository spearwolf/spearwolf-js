
export interface IBitmapChar {

  x0: number;
  x1: number;
  x2: number;
  x3: number;
  y0: number;
  y1: number;
  y2: number;
  y3: number;
  z0: number;
  z1: number;
  z2: number;
  z3: number;

  setUv: (u0: number, v0: number, u1: number, v1: number, u2: number, v2: number, u3: number, v3: number) => void;

  setPosition: (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, x3: number, y3: number, z3: number) => void;

}
