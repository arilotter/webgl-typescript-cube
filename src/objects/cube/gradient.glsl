#define PI 3.14159365
#define TAU 6.28318531

// lerp around a circle
float lerp_angle(in float start, in float end, in float interpolant) {
    float angle = mod(mod((start - end), TAU) + PI * 3.0, TAU) - PI;
    return angle * interpolant + end;
}

// lerp between colors in Lch space
vec3 lerp_lch(in vec3 start, in vec3 end, in float interpolant) {
    float hue = lerp_angle(start.z, end.z, interpolant);
    return vec3(mix(end.xy, start.xy, interpolant), hue);
}

float xyz2lab(float x) {
  if (x > 0.00885645) {
    return pow(x, 1.0/3.0);
  } else {
    return 7.787037 * x + (4.0/29.0);
  }
}

float lab2xyz(float x) {
  if (x > 0.206893034) {
    return pow(x, 3.0);
  } else {
    return (x - (4.0 / 29.0)) / 7.787037;
  }
}

const vec3 white_reference = vec3(1.0, 1.0, 1.0);

const mat3 sRGB_to_XYZ = mat3(0.4124564, 0.3575761, 0.1804375,
                              0.2126729, 0.7151522, 0.0721750,
                              0.0193339, 0.1191920, 0.9503041);

const mat3 XYZ_to_sRGB = mat3(3.2404542, -1.5371385, -0.4985314,
                             -0.9692660,  1.8760108,  0.0415560,
                              0.0556434, -0.2040259,  1.0572252);
vec3 rgb2lab(in vec3 rgb) {
	vec3 xyz = rgb * sRGB_to_XYZ;

  vec3 nonlinear = vec3(
    xyz2lab(xyz.x / white_reference.x),
    xyz2lab(xyz.y / white_reference.y),
    xyz2lab(xyz.z / white_reference.z)
  );

  vec3 lab = vec3(
    max(0.0, 116.0 * nonlinear.y - 16.0),
    500.0 * (nonlinear.x - nonlinear.y),
    200.0 * (nonlinear.y - nonlinear.z)
  );
  return lab;
}

vec3 lab2rgb(in vec3 lab) {
  float base = 1.0 / 116.0 * (lab.x + 16.0);
  vec3 xyz = vec3(
    white_reference.x * lab2xyz(base + 0.002 * lab.y),
    white_reference.y * lab2xyz(base),
    white_reference.z * lab2xyz(base - 0.005 * lab.z)
  );
  vec3 rgb = xyz * XYZ_to_sRGB;
  return rgb;
}

vec3 lab2lch(in vec3 lab) {
  return vec3(
    lab.x,
    length(lab.yz),
    atan(lab.z, lab.y)
  );
}

vec3 lch2lab(in vec3 lch) {
  return vec3(
    lch.x,
    cos(lch.z) * lch.y,
    sin(lch.z) * lch.y
  );
}


vec3 rgb2lch(in vec3 rgb) {
  return lab2lch(rgb2lab(rgb));
}

vec3 lch2rgb(in vec3 lch) {
  return lab2rgb(lch2lab(lch));
}

vec3 gradient(in vec3 start_rgb, in vec3 end_rgb, in float interpolant) {
  vec3 start_lch = rgb2lch(start_rgb);
  vec3 end_lch = rgb2lch(end_rgb);
  vec3 lch = lerp_lch(start_lch, end_lch, interpolant);
  return lch2rgb(lch);
}

#pragma glslify: export(gradient)
