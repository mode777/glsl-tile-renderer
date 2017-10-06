import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform } from "./decorators";
import { ShaderNode } from "./ShaderNode";

@node({name: "Ripple"})
export class RippleNode extends ShaderNode {

    @track() @input({ uniformName: "texture" })
    input: TextureNode;
    
    @track() @gui({ max: 50, min: 0.1, step: 0.01}) @uniform() 
    scaleX = 1.0;
    
    @track() @gui({ max: .5, min: 0.0001, step: 0.0001}) @uniform() 
    amplitudeY = .25;
    
    @track() @gui({ max: 50, min: 0.1, step: 0.01}) @uniform() 
    scaleY = 1.0;

    @track() @gui({ max: .5, min: 0.0001, step: 0.0001}) @uniform() 
    amplitudeX = .25;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/ripple.glsl"), width, height);
    }    

}