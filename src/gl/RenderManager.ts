import * as twgl from "twgl.js";

let gl: WebGLRenderingContext;
let program: twgl.ProgramInfo;
let buffer: twgl.BufferInfo;

export module RenderManager {
    
    export function getContext() {
        return gl;
    }
    
    export function init(canvas: HTMLCanvasElement, options?: WebGLContextAttributes) {
        gl = (<HTMLCanvasElement>document.getElementById("canvas")).getContext("webgl", options);
        const vs = require("../../assets/shaders/basic/texture_vs.glsl");
        const fs = require("../../assets/shaders/basic/texture_fs.glsl");
        program = twgl.createProgramInfo(gl, [vs, fs]);
        buffer = twgl.createBufferInfoFromArrays(gl, {
            position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
            texcoord: [ 0,  1,    1,  1,     0, 0,     0, 0,    1,  1,    1, 0   ]
        });
    }    

    export function render(texture: WebGLTexture, width?: number, height?: number){
        if(width && height)
            setSize(height, width);
        
        //twgl.bindFramebufferInfo(gl);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);        
        gl.useProgram(program.program);
        twgl.setBuffersAndAttributes(gl, program, buffer);
        twgl.setUniforms(program, { texture: texture });
        twgl.drawBufferInfo(gl, buffer);
    }

    export function runLoop(callback: () => void){
        var loop = () => {
            callback();
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    export function setSize(width: number, height: number){
        gl.canvas.width = width;
        gl.canvas.height = height;
    }
}