
import { initControls } from './controls.js';

import { Complex } from './complexNumbers.js';

/** @type {HTMLCanvasElement} */

let uResolutionLocation;
let uZoomLocation;
let uOffsetLocation;

let currentZoom = 0.005;
let currentOffset = new Float32Array([0.0, 0.0]);

let mouseX;
let mouseY;
// @ts-ignore
window.onload = function(){
    const canvas = document.getElementById("fractal");
    const gl = canvas?.getContext("webgl2");

    const w = canvas.width;
    const h = canvas.height;

    const program = initShaders(gl);
    const geometry = initBuffers(gl, program);

    canvas.addEventListener('wheel', (event) =>{
        event.preventDefault();

        if(event.deltaY < 0){
            currentZoom*=1.1;
        } else{
            currentZoom*=0.9
        }

        render(gl, program, geometry);
    })
    canvas.addEventListener('mousemove', (event) =>{
        const rect = canvas.getBoundingClientRect();

        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;

        render(gl, program, geometry);
    })
    canvas.addEventListener('click', (event) =>{
        currentOffset[0] += (mouseX - w/2) * currentZoom
        currentOffset[1] += -(mouseY - h/2) * currentZoom

        render(gl, program, geometry);
    })
    
}
function render(gl, program, geometry){
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.buffer);

    gl.enableVertexAttribArray(geometry.location);

    gl.vertexAttribPointer(geometry.location, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform1f(uZoomLocation, currentZoom);
    gl.uniform2f(uOffsetLocation, currentOffset[0], currentOffset[1])

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
function initBuffers(gl, program){
    const vertexBuffer = new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,

        -1.0, 1.0,
        1.0, -1.0,
        1.0,  1.0
    ]);

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexBuffer, gl.STATIC_DRAW );

    const positionLocation = gl.getAttribLocation(program, "position");
    uResolutionLocation = gl.getUniformLocation(program, "u_resolution");
    uZoomLocation = gl.getUniformLocation(program, "u_zoom");
    uOffsetLocation = gl.getUniformLocation(program, "u_offset");

    gl.enableVertexAttribArray(positionLocation);

    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

    return {
        buffer: positionBuffer,
        location: positionLocation
    }   
} 
const fragmentMandelbrot = 
`#version 300 es
precision lowp float;

uniform vec2 u_resolution;
uniform float u_zoom;
uniform vec2 u_offset;

out vec4 fragColor;

const int iterations = 1000;

vec4 mandelbrot_set_color(vec2 c){
    vec2 z = vec2(0.0, 0.0);

    int iterations_passed = 0;
    for(int i = 0; i < iterations; i++){
        if(z.x * z.x + z.y * z.y >= 4.0 || iterations_passed > iterations){
            break;
        }
        
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y);
        z += c;
        
        iterations_passed++;
    }
    
    float iters_percentage = float(iterations_passed)/float(iterations);
    
    vec4 color = vec4(1.0 * pow(iters_percentage, 0.416),
                      1.0 * pow(iters_percentage, 2.424),
                      1.0 * pow(iters_percentage, 1.408),
                      1.0);
    return color;
}
void main() {
    vec2 pixel_coords = gl_FragCoord.xy;
    
    vec2 converted_coords = vec2((pixel_coords.x - u_resolution.x/2.0) * u_zoom + u_offset.x,
                                (pixel_coords.y - u_resolution.y/2.0) * u_zoom + u_offset.y
                                );
    fragColor = mandelbrot_set_color(converted_coords);
}`
const vertexShader = 
`#version 300 es

in vec2 position;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`
function initShaders(gl){
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    var vs = gl.createShader(gl.VERTEX_SHADER);

    //@ts-ignore
    gl.shaderSource(fs, fragmentMandelbrot);
    gl.shaderSource(vs, vertexShader)

    gl?.compileShader(fs);
    gl?.compileShader(vs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(fs));
    }if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(vs));
    }

    var program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Cant link program', gl.getProgramInfoLog(program));
    }

    return program
}   
//@ts-ignore












