import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform } from "./decorators";
import { ShaderNode } from "./ShaderNode";

@node({name: "Step", nodeId: "core.step"})
export class StepNode extends ShaderNode {

    @track() @input({ uniformName: "texture" })
    input: TextureNode;
    
    @track() @gui({ max: 1, min: 0, step: 0.01})
    @uniform() 
    threshold1 = 0.5;

    @track() @gui({ max: 1, min: 0, step: 0.01})
    @uniform() 
    threshold2 = 1;
    
    @track() @gui({ max: 1, min: 0, step: 0.01}) 
    @uniform({ uniformName: "smoothing" }) 
    smooth = 0.05;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/step.glsl"), width, height);
    }    

}