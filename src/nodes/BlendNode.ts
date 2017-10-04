import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { gui } from "../ui/index";
import { input } from "./decorators";

export class BlendNode extends TextureNode {

    private framebuffer: Framebuffer;

    @track @input input0: TextureNode;
    @track @input input1: TextureNode;
    @track @input map: TextureNode;
    @track @gui() threshold = 0.5;

    constructor(private width, private height){
        super();
        this.name = "Blend";
        this.framebuffer = new Framebuffer(require("../../assets/shaders/basic/blend.glsl"), width, height);
    }          
    
    protected refresh(){
        
        this.framebuffer.uniforms.texture0 = this.input0 ? this.input0.getTexture() : RenderManager.getDefaultTexture();
        this.framebuffer.uniforms.texture1 = this.input1 ? this.input1.getTexture() : RenderManager.getDefaultTexture();
        this.framebuffer.uniforms.map = this.map ? this.map.getTexture() : RenderManager.getDefaultTexture();
        this.framebuffer.uniforms.threshold = this.threshold;
                
        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }

}