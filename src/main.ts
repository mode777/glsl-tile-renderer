import * as twgl from "twgl.js";
import * as dat from "dat-gui";

import { Framebuffer, RenderManager } from "./gl/index";
import { StepNode, BitmapNode, BlendNode, CheckerNode } from "./nodes/index";
import { TextureNode } from "./Nodes/TextureNode";
import { ColorNode } from "./nodes/ColorNode";
import { Trackable, track } from "./model/Trackable";
import { NodeImage } from "./ui/NodeImage";
import { GuiManager } from "./ui/index";
import { NodeManager } from "./ui/NodeManager";
import { GuiNode } from "./ui/GuiNode";
import { ReflectionManager } from "./model/ReflectionManager";

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

    //https://webglfundamentals.org/webgl/lessons/webgl-image-processing-continued.html
    //https://codepen.io/xgundam05/pen/bNeYbb?sort_col=item_updated_at&
    // const div = document.createElement("div");
    // document.body.appendChild(div);
    // images.forEach(x => { 
    //     div.appendChild(x.element);
    //     x.element.onclick = () => {
    //         preview.node = x.node;
    //         GuiManager.showEditor(x.node);
    //     } 
    // });    
    
    NodeManager.init(document.body);      
    NodeManager.addNode(checkers, 600, 300);
    NodeManager.addNode(tex1, 600, 100);
    NodeManager.addNode(tex2, 400, 100);
    NodeManager.addNode(step, 400, 300);
    NodeManager.addNode(blend, 100, 200);
    NodeManager.addNode(color, 100, 400);

    RenderManager.runLoop(()=> {        
        NodeManager.update();       
    });
})();