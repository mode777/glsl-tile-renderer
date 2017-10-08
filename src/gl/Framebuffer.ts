import * as twgl from "twgl.js";
import { RenderManager } from "./index";

const defaultVs = require("../../assets/shaders/basic/texture_vs.glsl");

export class Framebuffer {

    private gl: WebGLRenderingContext = RenderManager.getContext();
    private programInfo: twgl.ProgramInfo;
    private bufferInfo: twgl.BufferInfo;
    private framebufferInfo: twgl.FramebufferInfo;
    private vs = defaultVs;
    
    public readonly uniforms: any = {};
    
    constructor(
        private fs: string, 
        public readonly width = 512,
        public readonly height = 512
    ){                
        this.setShader(this.fs, this.vs);
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, {
            position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
            texcoord: [ 0,0, 1,0, 0,1, 0,1, 1,0, 1,1  ]            
        });
        this.framebufferInfo = twgl.createFramebufferInfo(this.gl, [
            {
                attach: this.gl.COLOR_ATTACHMENT0,
                wrap: this.gl.REPEAT,            
            }
        ], this.width, this.height);
        twgl.bindFramebufferInfo(this.gl);  
    }
    
    setShader(fs: string, vs = defaultVs){
        
        this.vs = vs;
        this.fs = fs;
        this.programInfo = RenderManager.getShader(this.vs, this.fs);
    }

    get texture() {
        return this.framebufferInfo.attachments[0];
    }

    public destroy(){
        this.gl.deleteTexture(this.framebufferInfo.attachments[0]);
        this.gl.deleteFramebuffer(this.framebufferInfo.framebuffer);
    }

    refresh() {
        twgl.bindFramebufferInfo(this.gl, this.framebufferInfo);
        this.gl.useProgram(this.programInfo.program);
        twgl.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo);
        twgl.setUniforms(this.programInfo, this.uniforms);
        twgl.drawBufferInfo(this.gl, this.bufferInfo);
        twgl.bindFramebufferInfo(this.gl);              
    }    

}