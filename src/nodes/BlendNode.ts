import * as twgl from "twgl.js";
import { Framebuffer } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { gui } from "../ui/index";

export class BlendNode extends TextureNode {

    private framebuffer: Framebuffer;

    @track input0: TextureNode;
    @track input1: TextureNode;
    @track map: TextureNode;
    @track @gui() threshold = 0.5;

    constructor(private width, private height){
        super();
        this.framebuffer = new Framebuffer(require("../../assets/shaders/basic/blend.glsl"), width, height);
    }          
    
    protected refresh(){
        
        if(this.input1 && this.input1 && this.map){
            this.framebuffer.uniforms.texture0 = this.input0.getTexture();
            this.framebuffer.uniforms.texture1 = this.input1.getTexture();
            this.framebuffer.uniforms.map = this.map.getTexture();
            this.framebuffer.uniforms.threshold = this.threshold;
        }
        else
           console.warn("Blend node is missing inputs");
                
        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }

}