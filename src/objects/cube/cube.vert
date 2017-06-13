precision mediump float;
attribute vec3 position;
attribute vec2 uv;
attribute float face;
varying vec2 vUv;
varying float vFace;
uniform mat4 projection, view;

void main() {
  vUv = uv;
  vFace = face;
  gl_Position = projection * view * vec4(position, 1.0);
}