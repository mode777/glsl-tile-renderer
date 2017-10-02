import * as twgl from "twgl.js";
import { Framebuffer } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { gui } from "../ui/index";

export class StepNode extends TextureNode {

    private framebuffer: Framebuffer;

    @track input: TextureNode;
    @track  @gui threshold = 0.5;
    @track  @gui smooth = 0.05;

    constructor(private width, private height){
        super();
        this.framebuffer = new Framebuffer(require("../../assets/shaders/basic/step.glsl"), width, height);
    }    

    protected refresh(){
        if(this.input)
            this.framebuffer.uniforms.texture = this.input.getTexture();
        else
            console.warn("Step Node is missing input");

        this.framebuffer.uniforms.threshold = this.threshold;
        this.framebuffer.uniforms.smoothing = this.smooth;

        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }

}