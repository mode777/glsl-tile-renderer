import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform, serialize, uniformColorSetter } from "./decorators";
import { ShaderNode } from "./ShaderNode";

@node({name: "Colorize", nodeId: "core.colorize"})
export class ColorizeNode extends ShaderNode {

    @track() @input({ uniformName: "texture" })
    input: TextureNode;
    
    @track() @gui({type: 'color'}) 
    @serialize()
    @uniform({ setter: uniformColorSetter })
    private low = [0,255,0];
    
    @track() @gui({type: 'color'}) 
    @serialize()
    @uniform({ setter: uniformColorSetter })
    private high = [0,0,255];

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/colorize.glsl"), width, height);
    }    

    

}