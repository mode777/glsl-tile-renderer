import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform } from "./decorators";
import { ShaderNode } from "./ShaderNode";

@node({name: "Tiles", nodeId: "core.tiles"})
export class TilesNode extends ShaderNode {
   
    @track() 
    @uniform({uniformName: "texture"}) 
    map: WebGLTexture;

    @track() @input({ uniformName: "tileset" })
    input: TextureNode;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/tiles.glsl"), width, height);
        const gl = RenderManager.getContext();
        this.map = twgl.createTexture(gl, {
            width: 4,
            height: 4,
            min: gl.NEAREST,
            mag: gl.NEAREST,
            format: gl.RGB,
            type: gl.UNSIGNED_BYTE,

            src: new Uint8Array([
                1,0,0, 0,1,0, 0,2,0, 1,2,0,
                15,15,0, 14,15,0, 15,0,0, 0,15,0,
                0,0,0, 0,0,0, 0,0,0, 0,0,0,
                0,0,0, 0,0,0, 0,0,0, 0,0,0,
            ])
        })
    }    

}