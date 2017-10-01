import * as twgl from "twgl.js";

export interface IShader {
    info: twgl.ProgramInfo;
    uniforms: any;
}



export interface ShaderCollection {

}

export interface INodeManager {
    readonly shaders: ShaderCollection;
    readonly gl: WebGLRenderingContext;
    readonly 
}