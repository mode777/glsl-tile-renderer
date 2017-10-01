import * as twgl from "twgl.js";
import { Framebuffer } from "../gl/index";
import { TextureNode } from "./TextureNode";

export class BlendNode extends TextureNode {

    private framebuffer: Framebuffer;
    private _input0: TextureNode;
    private _input1: TextureNode;
    private _map: TextureNode;

    constructor(private gl: WebGLRenderingContext, private width, private height){
        super();
        this.framebuffer = new Framebuffer(gl, require("../../assets/shaders/basic/blend.glsl"), width, height);
        this.framebuffer.uniforms.threshold = 0.5;
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

    public get map() {
        return this._map;
    }

    public set map(value){
        this._map = value;
        this.invalidate();
    }

    public set threshold(value){
        this.framebuffer.uniforms.threshold = value;
        this.invalidate();
    }
    
    protected async refreshAsync(){
        
        if(this._input1 && this.input1 && this.map){
            this.framebuffer.uniforms.texture0 = await this._input0.getTextureAsync();
            this.framebuffer.uniforms.texture1 = await this._input1.getTextureAsync();
            this.framebuffer.uniforms.map = await this._map.getTextureAsync();
        }
        else
        console.warn("Blend node is missing inputs");
        
        
        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }

}