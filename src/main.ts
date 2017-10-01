import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "./gl/index";
import { StepNode, BitmapNode, BlendNode, CheckerNode } from "./nodes/index";
import { TextureNode } from "./Nodes/TextureNode";
import { ColorNode } from "./nodes/ColorNode";
import { Trackable, track } from "./model/TrackableObject";

RenderManager.init((<HTMLCanvasElement>document.getElementById("canvas")));
const gl = RenderManager.getContext();

function createPreviews(width: number, height: number, ...nodes: TextureNode[]){
    const oldDiv = document.getElementById("previews");
    if(oldDiv){
        oldDiv.parentElement.removeChild(oldDiv);
    }

    const div = document.createElement("div");
    div.id = "previews";
    document.body.appendChild(div);

    nodes.forEach(n => {
        RenderManager.render(n.getTexture(), width, height);
        const img = new Image();
        img.src = gl.canvas.toDataURL();
        div.appendChild(img);
    });
}

async function main(){
    const checkers = new CheckerNode(8,8);

    const tex1 = await BitmapNode.createFromUrlAsync("assets/textures/test.png");
    const tex2 = await BitmapNode.createFromUrlAsync("assets/textures/test2.png");

    const step = new StepNode(512, 512);
    step.input = checkers;
    step.threshold = 0.9;

    const blend = new BlendNode(512, 512);
    blend.input0 = tex1;
    blend.input1 = tex2;
    blend.map = step;
    blend.threshold = 0;

    const color = new ColorNode(255, 128, 0);
    color.setColor(0,128,255);

    



    
    RenderManager.runLoop(()=> {
        if(blend.hasChanges){
            console.log("render!");
            createPreviews(128,128, step, checkers, tex1, tex2, color);
            RenderManager.render(blend.getTexture(), 512, 512);
        }
    });

    setTimeout(() => {
        step.threshold = 0.1;
    }, 1000);

    setTimeout(() => {
        blend.input0 = color;
    }, 2000);

    setTimeout(() => {
        color.setColor(255,0,0);
    }, 3000);
}

main();



