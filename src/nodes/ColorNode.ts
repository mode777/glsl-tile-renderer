import * as twgl from "twgl.js";
import { TextureNode } from "./TextureNode";
import { RenderManager } from "../gl/index";
import { track } from "../model/Trackable";
import { gui, node, serialize } from "./decorators";

@node({name: "Color"})
export class ColorNode extends TextureNode {

    private _texture: WebGLTexture;
    private _gl = RenderManager.getContext();
    
    @track() @gui({type: 'color'}) @serialize()
    private src = [255,0,0];

    constructor(r = 128, g = 128, b = 128){
        super();

        this.setColor(r,g,b);
        this._texture = twgl.createTexture(this._gl, {
            format: this._gl.RGB,
            src: this.src,
            width: 1,
            height: 1
        });
    }

    public setColor(r: number, g: number, b: number){
        this.src = [r,g,b];
    }

    public destroy(){
        this._gl.deleteTexture(this._texture);
    }

    protected refresh(){
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        this._gl.texSubImage2D(this._gl.TEXTURE_2D, 0, 0, 0, 1, 1, this._gl.RGB, this._gl.UNSIGNED_BYTE, new Uint8Array(this.src));
        
        return this._texture;
    }

}