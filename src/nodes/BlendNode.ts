import * as twgl from "twgl.js";
import { Framebuffer } from "../gl/index";
import { TextureNode } from "./TextureNode";

export class BlendNode extends TextureNode {

    private framebuffer: Framebuffer;
    private _input0: TextureNode;
    private _input1: TextureNode;
    private _map: TextureNode;

    constructor(private width, private height){
        super();
        this.framebuffer = new Framebuffer(require("../../assets/shaders/basic/blend.glsl"), width, height);
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

    public isValid(){
        if(!this._input0 || !this.input1 || !this._map)
            return false;

        return this._input0.isValid() &&
            this._input1.isValid() &&
            this._map.isValid() &&
            super.isValid()
    }
    
    protected refresh(){
        
        if(this._input1 && this.input1 && this.map){
            this.framebuffer.uniforms.texture0 = this._input0.getTexture();
            this.framebuffer.uniforms.texture1 = this._input1.getTexture();
            this.framebuffer.uniforms.map = this._map.getTexture();
        }
        else
           console.warn("Blend node is missing inputs");
        
        
        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }

}