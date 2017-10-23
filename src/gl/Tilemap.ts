import * as twgl from "twgl.js";
import { vec4, mat4, vec3, quat } from "gl-matrix";
import { Tileset } from "./Tileset";
import { Transform2d } from "./Transform";

const VS = require("../../assets/shaders/basic/texture_vs.glsl");
const FS = require("../../assets/shaders/basic/tiles.glsl");
const COMP_COLOR = 3;

let PROGRAM: twgl.ProgramInfo; 

export interface TilemapOptions {
    width: number,
    height: number,
    data: number[],
}

export class Tilemap {

    public readonly size: number[];

    private bufferInfo: twgl.BufferInfo;
    private texture: WebGLTexture;
    private data: Uint8Array;
    private scale: number[];
    //private ortho = mat4.ortho(mat4.create(), 0, this.gl.canvas.width, this.gl.canvas.height, 0, -2, 2);

    //private matrix: mat4;
    public readonly transform = new Transform2d(); 

    private uniforms = {
        texture:  null,
        tileset: null,
        map_size: [],
        tile_size: [],
        matrix: null,
        scale: null
    }

    constructor(
        private gl: WebGLRenderingContext,
        private tileset: Tileset,
        private options: TilemapOptions
    ){
        if(!PROGRAM)
            PROGRAM = twgl.createProgramInfo(gl, [VS, FS]);

        this.size = [options.width, options.height];

        this.createBufferInfo();
        this.createData(options.data);
        this.createTexture();

        this.updateUniforms();        
    }

    private updateUniforms(){
        const scale = [this.gl.canvas.width / (this.size[0] * this.tileset.tileSize[0]), this.gl.canvas.height / (this.size[1] * this.tileset.tileSize[1])];

        this.uniforms.texture = this.texture;
        this.uniforms.tileset = this.tileset.texture;
        this.uniforms.map_size = this.size;
        this.uniforms.tile_size = this.tileset.tileSize;
        this.uniforms.matrix = this.transform.matrix;
        this.uniforms.scale = scale;
    }

    private createBufferInfo(){
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, {
            position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
            texcoord: [ 0,  1,    1,  1,     0, 0,     0, 0,    1,  1,    1, 0   ]           
        });
    }

    private createTexture(){
        this.texture = twgl.createTexture(this.gl, {
            width: this.size[0],
            height: this.size[1],
            min: this.gl.NEAREST,
            mag: this.gl.NEAREST,
            format: this.gl.RGB,
            type: this.gl.UNSIGNED_BYTE,
            src: this.data
        });
    }

    private createData(data: number[]){
        const bytes = new Uint8Array(this.size[0] * this.size[1] * COMP_COLOR)

        data.forEach((id, index) => {
            const offset = index * COMP_COLOR;
            const tid = id-1;
            bytes[offset] = tid % this.size[0];
            bytes[offset+1] = Math.floor(tid / this.size[0]);
        });

        this.data = bytes;
    }

    public destroy(){
        this.gl.deleteBuffer(this.bufferInfo.indices);
        // TODO: Delete other buffers
    }

    public render(){
        this.updateUniforms();

        this.gl.useProgram(PROGRAM.program);
        twgl.setBuffersAndAttributes(this.gl, PROGRAM, this.bufferInfo);
        twgl.setUniforms(PROGRAM, this.uniforms);
        twgl.drawBufferInfo(this.gl, this.bufferInfo);
    }

}