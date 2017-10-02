import * as twgl from "twgl.js";
import * as dat from "dat.gui/build/dat.gui";

import { Framebuffer, RenderManager } from "./gl/index";
import { StepNode, BitmapNode, BlendNode, CheckerNode } from "./nodes/index";
import { TextureNode } from "./Nodes/TextureNode";
import { ColorNode } from "./nodes/ColorNode";
import { Trackable, track } from "./model/Trackable";
import { NodeThumbnail } from "./ui/NodeThumbnail";

RenderManager.init((<HTMLCanvasElement>document.getElementById("canvas")));
const gl = RenderManager.getContext();

(async function main(){
    const checkers = new CheckerNode(8,8);
    checkers.tile = 2;

    const tex1 = await BitmapNode.createFromUrlAsync("assets/textures/test.png");
    const tex2 = await BitmapNode.createFromUrlAsync("assets/textures/test2.png");

    const step = new StepNode(256, 256);
    step.input = checkers;

    const blend = new BlendNode(512, 512);
    blend.input0 = tex1;
    blend.input1 = tex2;
    blend.map = step;
    blend.threshold = 0;

    const color = new ColorNode(255, 128, 0);
    color.setColor(0,128,255);
       
    const thumbnails = [
        new NodeThumbnail(checkers),
        new NodeThumbnail(tex1),
        new NodeThumbnail(tex2),
        new NodeThumbnail(step),
        new NodeThumbnail(blend),
        new NodeThumbnail(color)
    ];

    let current: TextureNode;
    let gui: dat.GUI;

    const div = document.createElement("div");
    document.body.appendChild(div);
    thumbnails.forEach(x => { 
        div.appendChild(x.image);
        x.image.onclick = () => {
            current = x.node;

            if(gui){
                gui.destroy();
                gui = null;
            }

            if(x.node["__gui"]){
                gui = new dat.GUI;
                x.node["__gui"].forEach(name => {
                    gui.add(x.node, name);
                });
            }
        } 
    });
    
    RenderManager.runLoop(()=> {        
        thumbnails.forEach(x => x.update());
        if(current)
            RenderManager.render(current.getTexture(), 512, 512);        
    });
})();