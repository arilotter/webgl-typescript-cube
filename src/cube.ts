import * as vert from "./shaders/cube.vert";
import * as frag from "./shaders/cube.frag";
import randomColors from "./colors";

import createCube from "primitive-cube";
import * as mat4 from "gl-mat4";

const { positions, cells, uvs } = createCube();
const outPositions = cells
  .map(tri => tri.map(index => positions[index]))
  .reduce((a, b) => a.concat(b), []);

const outUVs = cells
  .map(tri => tri.map(index => uvs[index]))
  .reduce((a, b) => a.concat(b), []);

const outFaces = cells
  .map(tri => tri.map(index => cells.indexOf(tri)))
  .reduce((a, b) => a.concat(b), []);

const [startColor, endColor] = randomColors();

const cube = regl =>
  regl({
    frag,
    vert,
    attributes: {
      position: outPositions,
      uv: outUVs,
      face: outFaces
    },
    count: outPositions.length,
    uniforms: {
      projection: regl.prop("projection"),
      view: regl.prop("view"),
      time: ({ tick }) => 0.1 * tick,
      startColor,
      endColor
    }
  });
export default cube;
