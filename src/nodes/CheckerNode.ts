import * as twgl from "twgl.js";
import { Framebuffer } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { gui } from "../ui/index";

export class CheckerNode extends TextureNode {

    private framebuffer: Framebuffer;

    @track @gui tileX = 1;
    @track @gui tileY = 1;

    constructor(private width, private height){
        super();
        this.framebuffer = new Framebuffer(require("../../assets/shaders/basic/checkers.glsl"), width, height);
    }   
    
    set tile(val){
        this.tileX = val;
        this.tileY = val;
    }
    
    protected refresh(){
        this.framebuffer.uniforms.resolution = [this.width/this.tileX, this.height/this.tileY];
        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }
    
}