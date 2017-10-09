import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform, serialize, uniformColorSetter } from "./decorators";
import { ShaderNode } from "./ShaderNode";

@node({name: "ColorKey", nodeId: "core.colorkey"})
export class ColorKeyNode extends ShaderNode {

    @track() @input({ uniformName: "texture" })
    input: TextureNode;
    
    @track() @gui({type: 'color'}) 
    @serialize()
    @uniform({ setter: uniformColorSetter })
    private color = [0,255,0];
    
    //@track() @gui({ max: 1, min: 0, step: 0.01})
    //@uniform() 
    //fuzziness = 0.1;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/colorkey.glsl"), width, height);
    }    
}