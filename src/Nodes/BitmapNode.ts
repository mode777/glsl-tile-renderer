import * as twgl from "twgl.js";
import { TextureNode } from "./TextureNode";

export class BitmapNode extends TextureNode {

    private initializer: Promise<WebGLTexture>;

    constructor(private gl: WebGLRenderingContext, path: string){
        super();

        this.initializer = new Promise((res,rej) => {
            const texture = twgl.createTexture(gl, {
                src: path
            }, (err, tex, source) => { 
                if(err)
                rej(err);
                
                res(tex);              
            });
            
        });       
    }

    protected async refreshAsync(){
        var tex = await this.initializer;
        return tex;
    }

}