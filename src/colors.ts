import * as colors from "nice-color-palettes/500.json";

function randomColor(): number[] {
  let randomPalette = colors[Math.floor(Math.random() * colors.length)].map(
    hexToRgb
  ) as number[][];
  let colorPairs = pairwise(randomPalette) as number[][];
  let highestContrastPairs = colorPairs.sort(
    (a, b) => luminance(b) - luminance(a)
  );
  return highestContrastPairs[0].sort((a, b) => luminance(b) - luminance(a));
}

function hexToRgb(hex: string): number[] {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
    .exec(hex)
    .slice(1)
    .map(c => parseInt(c, 16) / 255);
}

function pairwise(list: any[]) {
  if (list.length < 2) {
    return [];
  }
  let rest = list.slice(1);
  return rest.map(x => [list[0], x]).concat(pairwise(rest));
}

function luminance(rgb) {
  let a = rgb.map(
    c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
  );
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export default randomColor;
