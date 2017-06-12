precision mediump float;

uniform float time;
uniform vec3 startColor;
uniform vec3 endColor;
varying vec2 vUv;
varying float vFace;

#pragma glslify: dither = require(glsl-dither/8x8)
#pragma glslify: gradient = require('./gradient')
const float scale = 3.0;
void main() {
  float pos;
  if(vFace == 8.0 || vFace == 9.0) {
    pos = 1.0;
  } else if(vFace == 10.0 || vFace == 11.0) {
    pos = 0.0;
  } else {
    pos = vUv.y;
  }
  gl_FragColor = vec4(gradient(startColor, endColor, (pos - 0.3) + (0.3 / 2.0) - sin(time / 8.0) * 0.3), 1.0);
}