import * as reglWrapper from 'regl';
import * as resl from 'resl';
import * as mat4 from 'gl-mat4';
import * as colorspace from 'color-space';
import * as cube from './cube';
const regl = reglWrapper({
    pixelRatio: window.devicePixelRatio / 2
}); // create a full screen canvas / WebGL context

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
            return mat4.lookAt([],
                [5 * Math.cos(t / 4), 5 * Math.sin(t / 4), 5 * Math.sin(t / 4)],
                [0, 0.0, 0],
                [0, 1, 0]
            )
        },
        projection: ({ viewportWidth, viewportHeight }) =>
            mat4.perspective([],
                Math.PI / 8,
                viewportWidth / viewportHeight,
                0.01,
                10),
        uTexture: regl.prop('texture')
    },
});

const startColor = [255, 85, 142];
const endColor = [0, 221, 222];
const canvas = document.createElement('canvas');
canvas.width = 64;
canvas.height = 64;
const ctx = canvas.getContext('2d');
console.log(colorspace);
const [startL, startC, startH] = colorspace.rgb.lchab(startColor);
const [endL, endC, endH] = colorspace.rgb.lchab(endColor);

const lDiff = endL - startL
const cDiff = endC - startC;
const hDiff = distance(endH, startH);

console.log(lDiff, cDiff, hDiff);

for (let i = 0; i < canvas.height; i++) {
    const fraction = i / canvas.height;
    const rgb = colorspace.lchab.rgb([
        startL + fraction * lDiff,
        startC + fraction * cDiff,
        startH + fraction * hDiff
    ]).map(Math.round);
    ctx.fillStyle = `rgb(${rgb.join(',')})`;
    console.log(ctx.fillStyle);
    ctx.fillRect(0, i, canvas.width, 1);
}

const texture = regl.texture(canvas);

regl.frame(() => {
    regl.clear({
        color: [255, 255, 255, 255],
        depth: 1
    });
    drawCube({ texture });
});


function distance(alpha: number, beta: number) {
    const phi = Math.abs(beta - alpha) % 360;
    const distance = phi > 180 ? 360 - phi : phi;
    const sign = (alpha - beta >= 0 && alpha - beta <= 180) || (alpha - beta <= -180 && alpha - beta >= -360) ? 1 : -1;
    return distance * sign;
}