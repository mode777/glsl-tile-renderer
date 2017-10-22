import * as twgl from "twgl.js";
import * as dat from "dat-gui";

import { Framebuffer, RenderManager } from "./gl/index";
import { BitmapNode } from "./nodes/index";
import "./nodes/index";
import { TextureNode } from "./Nodes/TextureNode";
import { Trackable, track } from "./model/Trackable";
import { ReflectionManager } from "./model/ReflectionManager";

import { TilesNode } from "./nodes/TilesNode";

RenderManager.init((<HTMLCanvasElement>document.getElementById("canvas")));
const gl = RenderManager.getContext();   

(async function main(){

    

    const tiles = new TilesNode();
    const bitmap = new BitmapNode("assets/textures/tileset.png"); 

    tiles.input = bitmap;


    RenderManager.runLoop(()=> {        
        RenderManager.render(tiles.getTexture(), 512, 512);       
    });
})();