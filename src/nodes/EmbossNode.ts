import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform } from "./decorators";
import { ShaderNode } from "./ShaderNode";

@node({name: "Emboss", nodeId: "core.emboss"})
export class EmbossNode extends ShaderNode {

    @track() @input({ uniformName: "texture" })
    input: TextureNode;
    
    @track() @gui({ max: Math.PI*2, min: 0, step: 0.001})
    @uniform() 
    dir = 0;

    @track() @gui({ max: 50, min: 0, step: 0.01})
    @uniform() 
    dist = 1;
    
    @track() @gui({ max: 10, min: 0, step: 0.01}) 
    @uniform() 
    strength = 1;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/step.glsl"), width, height);
    }    

}