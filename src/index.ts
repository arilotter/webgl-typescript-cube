import * as reglWrapper from 'regl';
import * as resl from 'resl';
import * as mat4 from 'gl-mat4';
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
                [5 * Math.cos(t), 2.5 * Math.sin(t), 5 * Math.sin(t)],
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
// Load resources
resl({
    manifest: {
        texture: {
            type: 'image',
            src: 'assets/cube.png',
            parser: (data) => regl.texture({
                data,
                mag: 'linear',
                min: 'linear'
            })
        }
    },
    onDone: ({ texture }) => {
        regl.frame(() => {
            regl.clear({
                color: [255, 255, 255, 255],
                depth: 1
            });
            drawCube({ texture });
        });
    }
})