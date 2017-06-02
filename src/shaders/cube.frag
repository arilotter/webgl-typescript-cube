precision mediump float;

uniform sampler2D uTexture;
varying vec2 vUv;

#pragma glslify: dither = require(glsl-dither/8x8)

void main() {
  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = dither(gl_FragCoord.xy, color) * 0.4 + color * 0.5;
  // gl_FragColor = color;
}