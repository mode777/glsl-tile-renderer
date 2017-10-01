import * as twgl from "twgl.js";

export class Framebuffer {

    private programInfo: twgl.ProgramInfo;
    private bufferInfo: twgl.BufferInfo;
    private framebufferInfo: twgl.FramebufferInfo;
    
    public readonly uniforms: any = {};
    
    constructor(
        private gl: WebGLRenderingContext,
        private fs: string, 
        public readonly width = 512,
        public readonly height = 512
    ){        
        const vs = require("../../assets/shaders/basic/texture_vs.glsl");
        this.programInfo = twgl.createProgramInfo(this.gl, [vs, fs]);
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, {
            position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
            texcoord: [ 1,1, 1,0, 0,1, 0,1, 1,0, 0,0  ]            
        });
        this.framebufferInfo = twgl.createFramebufferInfo(gl, [
            {
                attach: gl.COLOR_ATTACHMENT0,
                wrap: gl.REPEAT
            }
        ], this.width, this.height);
        twgl.bindFramebufferInfo(this.gl);  
    }

    get texture() {
        return this.framebufferInfo.attachments[0];
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