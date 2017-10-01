import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "./gl/index";
import { StepNode, BitmapNode, BlendNode, CheckerNode } from "./nodes/index";
import { TextureNode } from "./Nodes/TextureNode";
import { ColorNode } from "./nodes/ColorNode";

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

    createPreviews(128,128, checkers, tex1, tex2, color);
    
    RenderManager.runLoop(()=> {
        // if(!blend.isValid()){
        //     console.log("render!");
        //     RenderManager.render(blend.getTexture(), 512, 512);
        // }
    });

    setTimeout(() => {
        console.log("change!")
        step.threshold = 0.1;
    }, 3000);
}

main();

let testdeco = function(target, name){
    if(!target.props){
        target.props = [name]
    }
    else
        target.props.push(name)

}

class TestClass {
    @testdeco
    testprop: string = "a";
    @testdeco
    testprop2: string = "a";
    
    @testdeco
    get myprop() { return "a"; }
}

console.log(new TestClass()["props"])
console.log(TestClass["t"])