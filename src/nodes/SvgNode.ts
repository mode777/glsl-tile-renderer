import * as twgl from "twgl.js";
import { TextureNode } from "./TextureNode";
import { RenderManager } from "../gl/index";
import { track } from "../model/Trackable";
import { node, gui, serialize, initialize, sizeConstraints } from "./decorators";
const canvg = require("canvg-browser");

@node({name: "SVG", nodeId: "core.svg"})
export class SvgNode extends TextureNode {

    @track() 
    private _texture: WebGLTexture;
    
    @gui() @serialize()
    public path = "assets/svg/simple.svg";
    
    constructor(path?: string, width = 256, height = 256){
        super(); 
        
        if(path){
            this.path = path;
            this.loadTexture(); 
        }
    }

    @gui({name: "reload"}) @initialize()
    public loadTexture(path?: string){
        this.path = path || this.path;
        
        var canvas = <HTMLCanvasElement>document.createElement("canvas");
        canvg(canvas, this.path);
        console.log(canvas);

        const tex = twgl.createTexture(RenderManager.getContext(), {
            src: canvas
        });
        
        this.destroy();
        this._texture = tex;        
    }

    public destroy(){
        if(this._texture)
            RenderManager.getContext()
                .deleteTexture(this._texture);
    }

    protected refresh(){
        return this._texture;
    }

}