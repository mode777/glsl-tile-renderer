import { track } from "../model/Trackable";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { gui, sizeConstraints } from "./decorators";
import { ReflectionManager } from "../model/ReflectionManager";

export abstract class ShaderNode extends TextureNode {
    
    @track() protected framebuffer: Framebuffer;  
    @gui({constraints: sizeConstraints}) protected width;
    @gui({constraints: sizeConstraints}) protected height;

    constructor(
        private shader: string, 
        width = 256,
        height = 256
    ){
        super();    
        this.width = width;
        this.height = height;
        this.framebuffer = new Framebuffer(shader, width, height);
    }

    @gui()
    public resize(width?: number, height?: number){
        this.width = width || this.width;
        this.height = height || this.height;

        this.framebuffer.destroy();
        this.framebuffer = new Framebuffer(this.shader, this.width, this.height);
    }

    public destroy(){
        this.framebuffer.destroy();
    }

    protected refresh(){
        const uniforms = this.framebuffer.uniforms;
        ReflectionManager.getMetadata(this, "inputs").forEach(x => {
            uniforms[x.uniformName] = this[x.name] ? this[x.name].getTexture() : RenderManager.getDefaultTexture();
        });
        ReflectionManager.getMetadata(this, "uniforms").forEach(x => {
            uniforms[x.uniformName] = x.setter.call(this, this[x.name]);
        });           
        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }
}