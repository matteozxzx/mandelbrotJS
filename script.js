// @ts-check
import { initControls } from './controls.js';

import { Complex } from './complexNumbers.js';

/** @type {HTMLCanvasElement} */
// @ts-ignore
const canvas = document.getElementById("fractal");
const ctx = canvas?.getContext("2d");

const w = canvas.width;
const h = canvas.height;

// @ts-ignore
const imageData = ctx.createImageData(w, h);
const data = imageData.data

const iters = 100;
const currentPixelComplex = new Complex(0, 0);

let config = {
    scaleFactor: .004,
    xOffset: 0,
    yOffset: 0
};

initControls(
    canvas,
    //@ts-ignore
    (mouseX, mouseY) =>{
        config.xOffset += (mouseX - w/2) * (config.scaleFactor);
        config.yOffset += (mouseY - h/2) * (config.scaleFactor);

        console.log(`clicked. coords are ${config.xOffset}x, ${config.yOffset}y`);
        renderMandelbrot();
    },
    //@ts-ignore
    (paramName, value) => {
        //@ts-ignore
        config[paramName] = value;
        renderMandelbrot();
    }
)

renderMandelbrot();

function renderMandelbrot(){
    for(var i = 0; i < h; i++){
        currentPixelComplex.im = (i - h/2) * config.scaleFactor+config.yOffset;
        for(var j = 0; j < w; j++){
            currentPixelComplex.re = (j - w/2) * config.scaleFactor+config.xOffset;

            const pixelIndex = (i * w + j) * 4;

            const setCheckIters = Complex.mandelbrot_set_check(currentPixelComplex, iters);

            data[pixelIndex] = 255 * Math.pow(setCheckIters/iters, .5);
            data[pixelIndex + 1] = 255 * Math.pow(setCheckIters/iters, 10);
            data[pixelIndex + 2] = 255 * Math.pow(setCheckIters/iters, 2);

            data[pixelIndex + 3] = 255;
        }
    }
    ctx?.putImageData(imageData, 0, 0);
}
