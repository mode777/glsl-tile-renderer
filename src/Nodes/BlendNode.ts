import * as twgl from "twgl.js";
import { Shader } from "../gl/index";
import { TextureNode } from "./TextureNode";

export class BlendNode extends TextureNode {

    private shader: Shader;
    private _input0: TextureNode;
    private _input1: TextureNode;

    constructor(private gl: WebGLRenderingContext, private width, private height){
        super();
        this.shader = new Shader(gl, require("../../assets/shaders/basic/blend.glsl"), width, height);
        this.shader.uniforms.threshold = 0.5;
    }

    public get input0() {
        return this._input0;
    }

    public set input0(value){
        this._input0 = value;
        this.invalidate();
    }

    public get input1() {
        return this._input1;
    }

    public set input1(value){
        this._input1 = value;
        this.invalidate();
    }

    public set threshold(value){
        this.shader.uniforms.threshold = value;
        this.invalidate();
    }
    
    protected async refreshAsync(){
        if(this._input1 && this.input1){
            this.shader.uniforms.texture0 = await this._input0.getTextureAsync();
            this.shader.uniforms.texture1 = await this._input1.getTextureAsync();
        }
        else
            console.warn("Blend node is missing inputs");

        this.shader.refresh()
        return this.shader.texture;
    }

}