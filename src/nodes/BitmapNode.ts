import * as twgl from "twgl.js";
import { TextureNode } from "./TextureNode";
import { RenderManager } from "../gl/index";

export class BitmapNode extends TextureNode {

    static async createFromUrlAsync(url: string){
        const texture = await new Promise<WebGLTexture>((res,rej) => {
            twgl.createTexture(RenderManager.getContext(), {
                src: url
            }, (err, tex) => res(tex));
        });
        const node = new BitmapNode();
        node._texture = texture;
        return node;
    }

    private _texture: WebGLTexture;

    private constructor(){
        super(); 
    }

    protected refresh(){
        return this._texture;
    }

}