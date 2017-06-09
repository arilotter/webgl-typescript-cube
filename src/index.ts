import * as reglWrapper from "regl";
import * as resl from "resl";
import * as mat4 from "gl-mat4";
import * as colors from "nice-color-palettes/500.json";
import * as cube from "./cube";
const regl = reglWrapper(); // create a full screen canvas / WebGL context
const colorPalette = colors[Math.floor(Math.random() * colors.length)].map(
  hexToRgb
);
const drawCube = regl({
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
    time: ({ tick }) => 0.1 * tick,
    startColor: randomColor(),
    endColor: randomColor()
  }
});

regl.frame(() => {
  regl.clear({
    color: [255, 255, 255, 255],
    depth: 1
  });
  drawCube();
});

function randomColor() {
  return colorPalette[Math.floor(Math.random() * 5)];
  // return [255.0, 85.0, 142.0].map(c => c / 255);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result.slice(1).map(c => parseInt(c, 16) / 255);
}
