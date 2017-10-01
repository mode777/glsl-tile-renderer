// import * as twgl from "twgl.js";

// export class TextureRenderer {

//     private bufferInfo: twgl.BufferInfo;
//     private programInfo: twgl.ProgramInfo;

//     private _texture: WebGLTexture;

//     constructor(private gl: WebGLRenderingContext){
//         const vs = require("../../assets/shaders/basic/texture_vs.glsl");
//         const fs = require("../../assets/shaders/basic/texture_fs.glsl");
//         this.programInfo = twgl.createProgramInfo(gl, [vs, fs]);
//         this.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
//             position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
//             texcoord: [ 0,  1,    1,  1,     0, 0,     0, 0,    1,  1,    1, 0   ]
//         });
//     }

//     set texture(val: WebGLTexture) {
//         this._texture = val;
//         this.refresh();
//     }

//     get texture() {
//         return this._texture;
//     }

//     public refresh(){
//         this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);        
//         this.gl.useProgram(this.programInfo.program);
//         twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
//         twgl.setUniforms(this.programInfo, { texture: this._texture });
//         twgl.drawBufferInfo(this.gl, this.bufferInfo);
//     }


// }