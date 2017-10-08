import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform, serialize, uniformColorSetter } from "./decorators";
import { ShaderNode } from "./ShaderNode";

@node({name: "Extract alpha", nodeId: "core.alpha"})
export class AlphaNode extends ShaderNode {

    @track() @input({ uniformName: "texture" })
    input: TextureNode;
    
    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/alpha.glsl"), width, height);
    }       

}