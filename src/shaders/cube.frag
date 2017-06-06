precision mediump float;

uniform float time;
varying vec2 vUv;

#pragma glslify: dither = require(glsl-dither/8x8)
#pragma glslify: gradient = require('./gradient')
const vec3 startColor = vec3(255.0, 85.0, 142.0) / 255.0;
const vec3 endColor = vec3(0.0, 221.0, 222.0) / 255.0;
void main() {
  vec4 color = vec4(gradient(startColor, endColor, vUv.y - (sin(time / 8.0) / 2.0 + 0.5)), 1.0);
  gl_FragColor = dither(gl_FragCoord.xy, color) * 0.4 + color * 0.5;
}