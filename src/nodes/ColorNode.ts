import * as twgl from "twgl.js";
import { TextureNode } from "./TextureNode";

export class ColorNode extends TextureNode {

    private _texture: WebGLTexture;

    constructor(private gl: WebGLRenderingContext, r: number, g: number, b: number){
        super();

        this._texture = twgl.createTexture(gl, {
            format: gl.RGBA,
            src: new Uint8Array([
                r,
                g,
                b,
                255              
            ]),
            width: 1,
            height: 1
        });
    }

    protected async refreshAsync(){
        return Promise.resolve(this._texture);
    }

}