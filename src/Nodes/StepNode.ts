import * as twgl from "twgl.js";
import { Framebuffer } from "../gl/index";
import { TextureNode } from "./TextureNode";

export class StepNode extends TextureNode {

    private framebuffer: Framebuffer;
    private _input: TextureNode;

    constructor(private gl: WebGLRenderingContext, private width, private height){
        super();
        this.framebuffer = new Framebuffer(gl, require("../../assets/shaders/basic/step.glsl"), width, height);
        this.framebuffer.uniforms.threshold = 0.5;
        this.framebuffer.uniforms.smoothing = 0.05;
    }

    public get input() {
        return this._input;
    }

    public set input(value){
        this._input = value;
        this.invalidate();
    }

    public set threshold(value){
        this.framebuffer.uniforms.threshold = value;
        this.invalidate();
    }

    public set smooth(value){
        this.framebuffer.uniforms.smoothing = value;
        this.invalidate;
    }
    
    protected async refreshAsync(){
        if(this._input)
            this.framebuffer.uniforms.texture = await this._input.getTextureAsync();
        else
            console.warn("Step Node is missing input");

        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }

}