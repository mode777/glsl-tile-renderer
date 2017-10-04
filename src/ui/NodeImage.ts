import * as twgl from "twgl.js";
import { TextureNode } from "../nodes/TextureNode";
import { RenderManager } from "../gl/index";

export class NodeImage {

    public readonly element = new Image();
    private _revision: number;

    constructor(private _node: TextureNode, private width = 128, private height = 128){
        this._revision = _node.revision;
    }

    get node(){
        return this._node;
    }

    set node(val){
        this._node = val;
        this._revision = -1;
    }

    private render(){
        RenderManager.render(this._node.getTexture(), this.width, this.height);
        this.element.src = RenderManager.getContext().canvas.toDataURL();
        this._revision = this._node.revision;
    }

    update(){
        if(this._node.hasChanges || this._node.revision > this._revision ){
            this.render();
        }
    }

}