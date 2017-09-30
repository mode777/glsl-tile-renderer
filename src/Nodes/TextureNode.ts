export abstract class TextureNode {
    
    private _isValid = false;
    protected texture: WebGLTexture;
    
    protected invalidate(){
        this._isValid = false;
    }

    protected abstract refreshAsync(): Promise<WebGLTexture>;    
    
    async getTextureAsync(){
        if(!this._isValid){
            this.texture = await this.refreshAsync();
        }
        this._isValid = true;
        return this.texture;
    } 
}