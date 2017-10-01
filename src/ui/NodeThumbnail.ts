import * as twgl from "twgl.js";
import { TextureNode } from "../nodes/TextureNode";
import { RenderManager } from "../gl/index";

export class NodeThumbnail {

    public readonly image = new Image();
    private _revision: number;

    constructor(public readonly node: TextureNode, private width = 128, private height = 128){
        this._revision = node.revision;
    }

    private render(){
        RenderManager.render(this.node.getTexture(), this.width, this.height);
        this.image.src = RenderManager.getContext().canvas.toDataURL();
        this._revision = this.node.revision;
    }

    update(){
        if(this.node.hasChanges || this.node.revision > this._revision ){
            this.render();
        }
    }

}