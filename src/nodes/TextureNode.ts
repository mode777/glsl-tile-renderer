import { Trackable } from "../model/Trackable";
import { createGuid } from "../model/ReflectionManager";

export abstract class TextureNode extends Trackable {
    
    public _id = createGuid();
    public name = "";
    protected texture: WebGLTexture;
    
    protected abstract refresh(): WebGLTexture;    
    public abstract destroy(): void;    
        
    getTexture(){
        if(this.hasChanges){
            this.texture = this.refresh();    
            this.setUpdated();        
        }
        return this.texture;
    } 
}