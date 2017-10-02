import * as twgl from "twgl.js";
import { TextureNode } from "./TextureNode";
import { RenderManager } from "../gl/index";
import { track } from "../model/Trackable";
import { gui } from "../ui/index";

export class ColorNode extends TextureNode {

    private _texture: WebGLTexture;
    private _gl = RenderManager.getContext();
    
    @track @gui({type: 'color'}) private src = [255,0,0,255];

    constructor(r: number, g: number, b: number){
        super();

        this.setColor(r,g,b);
        this._texture = twgl.createTexture(this._gl, {
            format: this._gl.RGBA,
            src: this.src,
            width: 1,
            height: 1
        });
    }

    public setColor(r: number, g: number, b: number){
        this.src = [r,g,b,255];
    }

    protected refresh(){
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        this._gl.texSubImage2D(this._gl.TEXTURE_2D, 0, 0, 0, 1, 1, this._gl.RGBA, this._gl.UNSIGNED_BYTE, new Uint8Array(this.src));
        
        return this._texture;
    }

}