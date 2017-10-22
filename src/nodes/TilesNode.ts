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

    @track() @uniform()
    tile_size: number[];

    @track() @uniform()
    map_size: number[];

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/tiles.glsl"), width, height);
        const gl = RenderManager.getContext();
        this.map = twgl.createTexture(gl, {
            width: 16,
            height: 16,
            min: gl.NEAREST,
            mag: gl.NEAREST,
            format: gl.RGB,
            type: gl.UNSIGNED_BYTE,

            src: this.loadLayer()
        });
    }    

    private loadLayer(){
        const map = require("../../assets/maps/map.json");
        const layer = map.layers[0];
        const tileset = map.tilesets[0];

        const data = new Uint8Array(layer.data.length * 3);
        
        layer.data.forEach((id, index) => {
            const offset = index * 3;
            const tid = id-1;
            data[offset] = tid % layer.width;
            data[offset+1] = Math.floor(tid / layer.width);
        });

        this.map_size = [ map.width, map.height ];
        this.tile_size = [ map.tilewidth, map.tileheight ];
        console.log(this.tile_size)

        return data;
    }

}