import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui } from "./decorators";
import { ShaderNode } from "./ShaderNode";

export class StepNode extends ShaderNode {

    @track @input input: TextureNode;
    @track @gui({ max: 1, min: 0, step: 0.01}) threshold = 0.5;
    @track @gui({ max: 1, min: 0, step: 0.01}) smooth = 0.05;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/step.glsl"), width, height);
        this.name = "Step"
    }    

    protected refresh(){
        this.framebuffer.uniforms.texture = this.input ? this.input.getTexture() : RenderManager.getDefaultTexture();
        this.framebuffer.uniforms.threshold = this.threshold;
        this.framebuffer.uniforms.smoothing = this.smooth;

        return super.refresh();
    }

}