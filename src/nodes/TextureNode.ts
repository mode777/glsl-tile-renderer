import { Trackable } from "../model/Trackable";

export abstract class TextureNode extends Trackable {
    
    protected texture: WebGLTexture;
    
    protected abstract refresh(): WebGLTexture;    
    public name = "";
        
    getTexture(){
        if(this.hasChanges){
            this.texture = this.refresh();    
            this.setUpdated();        
        }
        return this.texture;
    } 
}