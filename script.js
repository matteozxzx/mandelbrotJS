// @ts-check

import { Complex } from './complexNumbers.js';

class vec2{
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
}

/** @type {HTMLCanvasElement} */
// @ts-ignore
const canvas = document.getElementById("fractal");

const ctx = canvas?.getContext("2d");

const w = canvas.width;
const h = canvas.height;

// @ts-ignore
const imageData = ctx.createImageData(w, h);
const data = imageData.data

const iters = 10;
const currentPixelComplex = new Complex(0, 0);

const scaleFactor = 0.005;

for(var i = 0; i < h; i++){
    currentPixelComplex.im = (i - h/2) * scaleFactor;
    for(var j = 0; j < w; j++){
        currentPixelComplex.re = (j - w/2) * scaleFactor;

        const pixelIndex = (i * w + j) * 4;

        if(Complex.mandelbrot_set_check(currentPixelComplex, iters) == true){
            data[pixelIndex] = 0;
            data[pixelIndex + 1] = 0;
            data[pixelIndex + 2] = 0;
        }
        else{
            data[pixelIndex] = 255;
            data[pixelIndex + 1] = 255;
            data[pixelIndex + 2] = 255;
        }
        data[pixelIndex + 3] = 255
    }
}

ctx?.putImageData(imageData, 0, 0);

function pixelToComplex(x = 0, y = 0){
    return new Complex(x - w/2, y - h/2);
}