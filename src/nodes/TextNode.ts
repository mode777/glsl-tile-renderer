import * as twgl from "twgl.js";
import { TextureNode } from "./TextureNode";
import { RenderManager } from "../gl/index";
import { track } from "../model/Trackable";
import { node, gui, serialize, initialize, sizeConstraints } from "./decorators";

@node({name: "Text", nodeId: "core.text"})
export class TextNode extends TextureNode {

    private readonly canvas = <HTMLCanvasElement>document.createElement("canvas");
    private readonly context2d = this.canvas.getContext("2d");

    @track() 
    private _texture: WebGLTexture;

    @gui({onChange: function(){ this.setUpdated(); } }) 
    public text = "Hello World";
   
    constructor(text?: string, width = 256, height = 256){
        super(); 
                        
        this.canvas.width = width;
        this.canvas.height = height;
        
        if(text){
            this.text = text;
            this.loadText(); 
        }
    }

    @gui({name: "reload"}) @initialize()
    public loadText(text?: string){
        this.text = text || this.text;
        
        this.context2d.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.context2d.font = '48px serif';
        this.context2d.fillText(this.text, 10, 50);

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
        this.loadText(this.text);
        return this._texture;
    }

}