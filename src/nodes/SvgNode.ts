import * as twgl from "twgl.js";
import { TextureNode } from "./TextureNode";
import { RenderManager } from "../gl/index";
import { track } from "../model/Trackable";
import { node, gui, serialize, initialize, sizeConstraints } from "./decorators";
const canvg = require("canvg-browser");

@node({name: "SVG", nodeId: "core.svg"})
export class SvgNode extends TextureNode {

    private readonly canvas = <HTMLCanvasElement>document.createElement("canvas");

    @track() @gui({constraints: sizeConstraints}) protected width;
    @track() @gui({constraints: sizeConstraints}) protected height;

    @track() 
    private _texture: WebGLTexture;
    
    @gui() @serialize()
    public path = "assets/svg/simple.svg";
    
    constructor(path?: string, width = 256, height = 256){
        super(); 
        this.width = width;
        this.height = height;
        if(path){
            this.path = path;
            this.render(); 
        }
    }

    @gui({name: "reload"}) @initialize()
    public render(path?: string){
        this.path = path || this.path;
        
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        canvg(this.canvas, this.path, {
            ignoreDimensions: true,
            scaleWidth: this.width,
            scaleHeight: this.height
        });
        
        const tex = twgl.createTexture(RenderManager.getContext(), {
            src: this.canvas,
            min: RenderManager.getContext().LINEAR
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
        if(this.changes.indexOf("width") !== -1 || this.changes.indexOf("height") !== -1){
            this.render();
        }

        return this._texture;
    }

}