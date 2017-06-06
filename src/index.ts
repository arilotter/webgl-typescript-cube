import * as reglWrapper from "regl";
import * as resl from "resl";
import * as mat4 from "gl-mat4";
import * as cube from "./cube";
const regl = reglWrapper(); // create a full screen canvas / WebGL context

const drawCube = regl({
  frag: cube.frag,
  vert: cube.vert,
  attributes: {
    position: cube.position,
    uv: cube.uv
  },
  elements: cube.elements,
  uniforms: {
    view: ({ tick }) => {
      const t = 0.01 * tick;
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
    time: ({ tick }) => 0.1 * tick
  }
});

regl.frame(() => {
  regl.clear({
    color: [255, 255, 255, 255],
    depth: 1
  });
  drawCube();
});
