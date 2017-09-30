import * as twgl from "twgl.js";
import { Shader } from "../gl/index";
import { TextureNode } from "./TextureNode";

export class CheckerNode extends TextureNode {

    private shader: Shader;

    constructor(private gl: WebGLRenderingContext, private width, private height){
        super();
        this.shader = new Shader(gl, require("../../assets/shaders/basic/checkers.glsl"), width, height);
        this.update();
    }

    private update(){
        this.shader.uniforms.resolution = [this.width/this._tx, this.height/this._ty];
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
        this.shader.refresh()
        return Promise.resolve(this.shader.texture);
    }

}