import * as twgl from "twgl.js";
import { TextureNode } from "./TextureNode";
import { RenderManager } from "../gl/index";
import { track } from "../model/Trackable";
import { node, gui, serialize, initialize } from "./decorators";

@node({name: "Bitmap", nodeId: "core.bitmap"})
export class BitmapNode extends TextureNode {

    static async createFromUrlAsync(url: string){
        const texture = await new Promise<WebGLTexture>((res,rej) => {
            twgl.createTexture(RenderManager.getContext(), {
                src: url
            }, (err, tex) => res(tex));
        });
        const node = new BitmapNode();
        node._texture = texture;
        node.path = url;
        return node;
    }

    @track() 
    private _texture: WebGLTexture;
    
    @gui() @serialize()
    public path = "assets/textures/test2.png";
    
    constructor(path?: string){
        super(); 
        if(path){
            this.path = path;
            this.loadTexture(); 
        }
    }

    @gui({name: "reload"}) @initialize()
    public loadTexture(path?: string){
        this.path = path || this.path;

        const gl = RenderManager.getContext();

        twgl.createTexture(gl, {
            src: this.path,
            minMag: gl.LINEAR
        }, (err, tex) => {
            this.destroy();
            this._texture = tex;
        });        
    }

    public destroy(){
        if(this._texture)
            RenderManager.getContext().deleteTexture(this._texture);
    }


    protected refresh(){
        return this._texture;
    }

}