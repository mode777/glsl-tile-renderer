import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform, serialize } from "./decorators";
import { ShaderNode } from "./ShaderNode";

@node({name: "Ripple", nodeId: "core.ripple"})
export class RippleNode extends ShaderNode {

    @track() @input({ uniformName: "texture" })
    input: TextureNode;
    
    @track() @gui({ max: 50, min: 0.1, step: 0.01}) 
    @uniform() @serialize()
    scaleX = 1.0;
    
    @track() @gui({ max: .5, min: 0.0001, step: 0.0001}) 
    @uniform() @serialize() 
    amplitudeY = .25;
    
    @track() @gui({ max: 50, min: 0.1, step: 0.01}) 
    @uniform() @serialize() 
    scaleY = 1.0;

    @track() @gui({ max: .5, min: 0.0001, step: 0.0001}) 
    @uniform() @serialize() 
    amplitudeX = .25;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/ripple.glsl"), width, height);
    }    

}