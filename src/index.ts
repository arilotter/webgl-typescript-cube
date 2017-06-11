import * as reglWrapper from "regl";
import * as resl from "resl";
import * as mat4 from "gl-mat4";
import * as cube from "./cube";
import * as colors from "./colors";

let [startColor, endColor] = colors.random();

let regl = reglWrapper(); // create a full screen canvas / WebGL context
let drawCube = regl({
  frag: cube.frag,
  vert: cube.vert,
  attributes: {
    position: cube.positions,
    uv: cube.uv,
    face: cube.faces
  },
  count: cube.positions.length,
  uniforms: {
    view: ({ tick }) => {
      let t = 0.01 * tick;
      return mat4.lookAt(
        [],
        [5 * Math.cos(t / 4), 5 * Math.sin(t / 4), 5 * Math.sin(t / 4)],
        [0, 0.0, 0],
        [0, 1, 0]
      );
    },
    projection: ({ viewportWidth, viewportHeight }) =>
      mat4.perspective(
        [],
        Math.PI / 8,
        viewportWidth / viewportHeight,
        0.01,
        10
      ),
    time: ({ tick }) => 0.1 * tick,
    startColor,
    endColor
  }
});

regl.frame(() => {
  regl.clear({
    color: [255, 255, 255, 255],
    depth: 1
  });
  drawCube();
});
