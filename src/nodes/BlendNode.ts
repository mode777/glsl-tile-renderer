import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui } from "./decorators";
import { ShaderNode } from "./ShaderNode";

export class BlendNode extends ShaderNode {

    @track @input input0: TextureNode;
    @track @input input1: TextureNode;
    @track @input map: TextureNode;
    @track @gui() threshold = 0.5;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/blend.glsl"), width, height);
        this.name = "Blend";
    }          
    
    protected refresh(){
        
        this.framebuffer.uniforms.texture0 = this.input0 ? this.input0.getTexture() : RenderManager.getDefaultTexture();
        this.framebuffer.uniforms.texture1 = this.input1 ? this.input1.getTexture() : RenderManager.getDefaultTexture();
        this.framebuffer.uniforms.map = this.map ? this.map.getTexture() : RenderManager.getDefaultTexture();
        this.framebuffer.uniforms.threshold = this.threshold;
                
        return super.refresh();
    }

}