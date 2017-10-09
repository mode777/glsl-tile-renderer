import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform, serialize, uniformColorSetter } from "./decorators";
import { ShaderNode } from "./ShaderNode";

@node({name: "HSL", nodeId: "core.hsl"})
export class HslNode extends ShaderNode {

    @track() @input({ uniformName: "texture" })
    input: TextureNode;
    
    @track() @gui({ min: -1.0, max: 1.0, step: 0.001 }) 
    @serialize() @uniform()
    private hue = 0;

    @track() @gui({ min: 0.0, max: 2.0, step: 0.001 }) 
    @serialize() @uniform()
    private saturation = 1.0;

    @track() @gui({ min: 0.0, max: 2.0, step: 0.001 }) 
    @serialize() @uniform()
    private lightness = 1.0;
    
    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/hsl.glsl"), width, height);
    }    

}