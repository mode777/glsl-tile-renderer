import * as twgl from "twgl.js";
import { TextureNode } from "../nodes/TextureNode";
import { RenderManager } from "../gl/index";

export class NodeImage {

    public readonly element = new Image();
    private _revision: number;

    constructor(private _node: TextureNode, private _width = 128, private _height = 128){
        this._revision = _node.revision;
        this.resize(_width, _height);
    }

    get width() { return this._width; }
    get height() { return this._height; }
    
    get node(){
        return this._node;
    }
    
    set node(val){
        this._node = val;
        this._revision = -1;
    }
    
    public resize(width: number, height: number){
        this._width = width;
        this._height = height;
        this.element.style.width = width+"px";
        this.element.style.height = height+"px";
        this.render();
    }

    private render(){
        RenderManager.render(this._node.getTexture(), this._width, this._height);
        this.element.src = RenderManager.getContext().canvas.toDataURL();
        this._revision = this._node.revision;
    }

    update(){
        if(this._node.hasChanges || this._node.revision > this._revision ){
            this.render();
        }
    }

}