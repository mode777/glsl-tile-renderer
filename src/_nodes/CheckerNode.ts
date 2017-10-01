import * as twgl from "twgl.js";
import { Framebuffer } from "../gl/index";
import { TextureNode } from "./TextureNode";

export class CheckerNode extends TextureNode {

    private framebuffer: Framebuffer;

    constructor(private gl: WebGLRenderingContext, private width, private height){
        super();
        this.framebuffer = new Framebuffer(gl, require("../../assets/shaders/basic/checkers.glsl"), width, height);
        this.update();
    }

    private update(){
        this.framebuffer.uniforms.resolution = [this.width/this._tx, this.height/this._ty];
        this.invalidate();
    }

    private _tx = 1;
    get tileX() { return this._tx;  }
    set tileX(val) { 
        this._tx = val;
        this.update();
    }
    
    private _ty = 1;
    get tileY() { 
        return this._ty;  
    }
    set tileY(val) { 
        this._ty = val;
        this.update();
    }

    set tile(val){
        this._tx = val;
        this._ty = val;
        this.update();
    }

    protected refreshAsync(){
        this.framebuffer.refresh()
        return Promise.resolve(this.framebuffer.texture);
    }

}