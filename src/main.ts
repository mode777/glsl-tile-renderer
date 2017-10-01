import * as twgl from "twgl.js";
import { TextureRenderer, Framebuffer } from "./gl/index";
import { StepNode, BitmapNode, BlendNode, CheckerNode } from "./nodes/index";
import { TextureNode } from "./Nodes/TextureNode";
import { ColorNode } from "./nodes/ColorNode";

const gl = (<HTMLCanvasElement>document.getElementById("canvas")).getContext("webgl");
const output = new TextureRenderer(gl);

async function delay(ms: number){
    return new Promise((res) => setTimeout(() => res(), ms));
}

async function createPreviewsAsync(width: number, height: number, ...nodes: TextureNode[]){
    const oldDiv = document.getElementById("previews");
    if(oldDiv){
        oldDiv.parentElement.removeChild(oldDiv);
    }    

    const div = document.createElement("div");
    div.id = "previews";
    document.body.appendChild(div);

    const prevSize = [gl.canvas.width, gl.canvas.height];
    const prevText = output.texture;

    gl.canvas.width = width;
    gl.canvas.height = height;
    
    await Promise.all(nodes.map(async n => {
        output.texture = await n.getTextureAsync();
        const img = new Image();
        img.src = gl.canvas.toDataURL();
        div.appendChild(img);
    }));

    gl.canvas.width = prevSize[0];
    gl.canvas.height = prevSize[1];
    
    output.texture = prevText;
}

async function main(){
    
    const checkers = new CheckerNode(gl, 8,8);
    
    const tex1 = new BitmapNode(gl, "assets/textures/test.png");
    const tex2 = new BitmapNode(gl, "assets/textures/test2.png");
    
    const step = new StepNode(gl, 512, 512);
    step.input = checkers;
    step.threshold = 0.9;

    const color = new ColorNode(gl ,255, 128, 0);

    const blend = new BlendNode(gl, 512, 512);
    blend.input0 = tex1;
    blend.input1 = tex2;
    blend.map = step;
    blend.threshold = 0;

    var texture = await blend.getTextureAsync();

    await createPreviewsAsync(128,128, color, checkers, tex1, tex2, step, blend);
}

function render(){
    
}

main();


