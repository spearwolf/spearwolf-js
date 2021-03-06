
export interface ITileQuadBase {

  x0: number;
  x1: number;
  x2: number;
  x3: number;

  z0: number;
  z1: number;
  z2: number;
  z3: number;

  setPosition: (x0: number, z0: number, x1: number, z1: number, x2: number, z2: number, x3: number, z3: number) => void;

  s0: number;
  s1: number;
  s2: number;
  s3: number;

  t0: number;
  t1: number;
  t2: number;
  t3: number;

  setUv: (u0: number, v0: number, u1: number, v1: number, u2: number, v2: number, u3: number, v3: number) => void;

}
