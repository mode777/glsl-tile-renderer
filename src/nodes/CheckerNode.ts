import * as twgl from "twgl.js";
import { Framebuffer } from "../gl/index";
import { TextureNode } from "./TextureNode";

export class CheckerNode extends TextureNode {

    private framebuffer: Framebuffer;

    constructor(private width, private height){
        super();
        this.framebuffer = new Framebuffer(require("../../assets/shaders/basic/checkers.glsl"), width, height);
    }
   
    private _tx = 1;
    get tileX() { return this._tx;  }
    set tileX(val) { 
        this._tx = val;
        this.invalidate();
    }
    
    private _ty = 1;
    get tileY() { 
        return this._ty;  
    }
    set tileY(val) { 
        this._ty = val;
        this.invalidate();
    }
    
    set tile(val){
        this._tx = val;
        this._ty = val;
        this.invalidate();
    }
    
    protected refresh(){
        this.framebuffer.uniforms.resolution = [this.width/this._tx, this.height/this._ty];
        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }
    
}