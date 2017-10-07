import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform, serialize } from "./decorators";
import { ShaderNode } from "./ShaderNode";

@node({name: "Blend"})
export class BlendNode extends ShaderNode {

    @track() @input({ uniformName: "texture0" })
    input0: TextureNode;

    @track() @input({ uniformName: "texture1" })
    input1: TextureNode;

    @track() @input() 
    map: TextureNode;

    @track() @gui() @uniform() @serialize()
    threshold = 0.5;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/blend.glsl"), width, height);
    }          
    
}