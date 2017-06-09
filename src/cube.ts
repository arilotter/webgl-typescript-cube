import * as vert from "./shaders/cube.vert";
import * as frag from "./shaders/cube.frag";

import createCube from "primitive-cube";

const { positions, cells, uvs } = createCube();
const outPositions = cells
  .map(tri => tri.map(index => positions[index]))
  .reduce((a, b) => a.concat(b), []);

const outUVs = cells
  .map(tri => tri.map(index => uvs[index]))
  .reduce((a, b) => a.concat(b), []);

const faces = cells
  .map(tri => tri.map(index => cells.indexOf(tri)))
  .reduce((a, b) => a.concat(b), []);

export { outPositions as positions, outUVs as uv, faces, vert, frag };
