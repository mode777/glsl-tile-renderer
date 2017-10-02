import * as twgl from "twgl.js";
import * as dat from "dat-gui";

import { Framebuffer, RenderManager } from "./gl/index";
import { StepNode, BitmapNode, BlendNode, CheckerNode } from "./nodes/index";
import { TextureNode } from "./Nodes/TextureNode";
import { ColorNode } from "./nodes/ColorNode";
import { Trackable, track } from "./model/Trackable";
import { NodeImage } from "./ui/NodeThumbnail";
import { GuiManager } from "./ui/index";

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
       
    const preview = new NodeImage(blend, 512, 512);

    const images = [
        preview,
        new NodeImage(checkers),
        new NodeImage(tex1),
        new NodeImage(tex2),
        new NodeImage(step),
        new NodeImage(blend),
        new NodeImage(color)
    ];

    //https://codepen.io/xgundam05/pen/bNeYbb?sort_col=item_updated_at&
    const div = document.createElement("div");
    document.body.appendChild(div);
    images.forEach(x => { 
        div.appendChild(x.element);
        x.element.onclick = () => {
            preview.node = x.node;
            GuiManager.showEditor(x.node);
        } 
    });
    
    RenderManager.runLoop(()=> {        
        images.forEach(x => x.update());       
    });
})();