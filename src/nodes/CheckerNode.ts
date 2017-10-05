import * as twgl from "twgl.js";
import { Framebuffer } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { ShaderNode } from "./ShaderNode";
import { gui, node } from "./decorators";

@node()
export class CheckerNode extends ShaderNode {

    @track @gui({ max: 16, min: 1, step: 1}) tileX = 1;
    @track @gui({ max: 16, min: 1, step: 1}) tileY = 1;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/checkers.glsl"), width, height);
        this.name = "Checker";
    }   
    
    set tile(val){
        this.tileX = val;
        this.tileY = val;
    }
    
    protected refresh(){
        this.framebuffer.uniforms.resolution = [this.width/this.tileX, this.height/this.tileY];
        return super.refresh();
    }
    
}