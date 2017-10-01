import { Trackable } from "../model/TrackableObject";

export abstract class TextureNode extends Trackable {
    
    protected texture: WebGLTexture;
    
    protected abstract refresh(): WebGLTexture;    
        
    getTexture(){
        if(this.hasChanges){
            this.texture = this.refresh();    
            this.setUpdated();        
        }
        return this.texture;
    } 
}