export abstract class TextureNode {
    
    private _isValid = false;
    protected texture: WebGLTexture;
    
    protected invalidate(){
        this._isValid = false;
    }

    protected abstract refresh(): WebGLTexture;    
    
    public isValid(){
        return this._isValid;
    }    
    
    getTexture(){
        if(!this._isValid){
            this.texture = this.refresh();
        }
        this._isValid = true;
        return this.texture;
    } 
}