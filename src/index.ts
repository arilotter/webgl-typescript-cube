import reglWrapper from "regl";
import resl from "resl";
import createControls from "orbit-controls";
import createCamera from "perspective-camera";

import createCube from "./cube";

const regl = reglWrapper(); // create a full screen canvas / WebGL context
const drawCube = createCube(regl);

const camera = createCamera({
  fov: 40 * Math.PI / 180,
  near: 0.01,
  far: 10
});

const controls = createControls({
  canvas: regl._gl.canvas,
  distance: 4,
  damping: 0.01
});

regl.frame(({ viewportWidth, viewportHeight }) => {
  controls.update();
  controls.copyInto(camera.position, camera.direction, camera.up);
  camera.viewport = [0, 0, viewportWidth, viewportHeight];
  camera.update();
  regl.clear({
    color: [255, 255, 255, 255],
    depth: 1
  });
  drawCube({
    projection: camera.projection,
    view: camera.view
  });
});
