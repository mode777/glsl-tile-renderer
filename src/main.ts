import * as twgl from "twgl.js";
import { TextureRenderer, Shader } from "./gl/index";
import { CheckerNode } from "./Nodes/CheckerNode";
import { StepNode, BitmapNode } from "./Nodes/index";
import { BlendNode } from "./Nodes/BlendNode";

async function main(){

    const gl = (<HTMLCanvasElement>document.getElementById("canvas")).getContext("webgl");
    const output = new TextureRenderer(gl);
    
    const checkers = new CheckerNode(gl, 8,8);
    checkers.tileY = 2;
    
    const tex1 = new BitmapNode(gl, "assets/textures/test.png");
    const tex2 = new BitmapNode(gl, "assets/textures/test2.png");
    
    const step = new StepNode(gl, 512, 512);
    step.input = checkers;
    step.smooth = 0.03;
    step.threshold = 0.9;


    const blend = new BlendNode(gl, 512, 512);
    blend.input0 = tex1;
    blend.input1 = tex2;
    blend.threshold = .7;

    var texture = await blend.getTextureAsync();

    output.texture = texture;
}

main();


