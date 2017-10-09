import { track } from "../model/Trackable";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { gui, sizeConstraints } from "./decorators";
import { ReflectionManager } from "../model/ReflectionManager";
import { vec4, mat4, vec3, quat } from "gl-matrix";
import * as twgl from "twgl.js"; 

export abstract class ShaderNode extends TextureNode {
    
    @track() protected framebuffer: Framebuffer;  
    @track() @gui({constraints: sizeConstraints}) protected width;
    @track() @gui({constraints: sizeConstraints}) protected height;

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

    //@gui()
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
        const changes = this.changes;
        if(changes.indexOf("width") !== -1 || changes.indexOf("height") !== -1){
            this.resize();
        }

        const uniforms = this.framebuffer.uniforms;
        ReflectionManager.getMetadata(this, "inputs").forEach(x => {
            uniforms[x.uniformName] = this[x.name] ? this[x.name].getTexture() : RenderManager.getDefaultTexture();
        });
        ReflectionManager.getMetadata(this, "uniforms").forEach(x => {
            uniforms[x.uniformName] = x.setter.call(this, this[x.name]);
        });           

        const matrix = mat4.create();
        const _quat = quat.create();
        const trans = vec3.fromValues(0,0,0);
        const origin = vec3.fromValues(0,0,0);
        const scale = vec3.fromValues(1,1,1);
        const axis = vec3.fromValues(0,0,1);
        const angle = 0;
        
        quat.setAxisAngle(_quat, axis, angle);
        mat4.fromRotationTranslationScaleOrigin(matrix, _quat, trans, scale, origin);
        const ident = mat4.identity(mat4.create());
        uniforms.matrix = ident;

        
        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }
}