import * as twgl from "twgl.js";
import { Shader } from "../gl/index";
import { TextureNode } from "./TextureNode";

export class StepNode extends TextureNode {

    private shader: Shader;
    private _input: TextureNode;

    constructor(private gl: WebGLRenderingContext, private width, private height){
        super();
        this.shader = new Shader(gl, require("../../assets/shaders/basic/step.glsl"), width, height);
        this.shader.uniforms.threshold = 0.5;
        this.shader.uniforms.smoothing = 0.05;
    }

    public get input() {
        return this._input;
    }

    public set input(value){
        this._input = value;
        this.invalidate();
    }

    public set threshold(value){
        this.shader.uniforms.threshold = value;
        this.invalidate();
    }

    public set smooth(value){
        this.shader.uniforms.smoothing = value;
        this.invalidate;
    }
    
    protected async refreshAsync(){
        if(this._input)
            this.shader.uniforms.texture = await this._input.getTextureAsync();
        else
            console.warn("Step Node is missing input");

        this.shader.refresh()
        return this.shader.texture;
    }

}