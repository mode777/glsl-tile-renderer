import { track } from "../model/Trackable";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { gui, sizeConstraints } from "./decorators";
import { ReflectionManager } from "../model/ReflectionManager";
import { vec4, mat4, vec3, quat } from "gl-matrix";
import * as twgl from "twgl.js"; 

export abstract class ShaderNode extends TextureNode {
    
    // transform
    private readonly _matrix = mat4.create();
    private readonly _quat = quat.create();
    private readonly _trans = vec3.fromValues(0,0,0);
    private readonly _origin = vec3.fromValues(0,0,0);
    private readonly _scale = vec3.fromValues(1,1,1);
    private readonly _axis = vec3.fromValues(0,0,1);
    
    @track() @gui({min: 0, max: 1, step: 0.001, name: "angle"}) protected t_angle = 0;
    @track() @gui({min: 0.1, max: 16, step: 0.1, name: "scale X"}) protected t_sx = 1;
    @track() @gui({min: 0.1, max: 16, step: 0.1, name: "scale Y"}) protected t_sy = 1;
    @track() @gui({min: 0, max: 1.0, step: 0.01, name: "X"}) protected t_x = 0;
    @track() @gui({min: 0, max: 1.0, step: 0.01, name: "Y"}) protected t_y = 0;
    @track() @gui({min: 0, max: 1.0, step: 0.01, name: "origin X"}) protected t_ox = 0.5;
    @track() @gui({min: 0, max: 1.0, step: 0.01, name: "origin Y"}) protected t_oy = 0.5;

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

    @gui()
    public resetTransform(){
        this.t_angle = 0;
        this.t_sx = 1;
        this.t_sy = 1;
        this.t_x = 0;
        this.t_y = 0;
        this.t_ox = 0.5;
        this.t_oy = 0.5;
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


        
        quat.setAxisAngle(this._quat, this._axis, this.t_angle * (Math.PI * 2));
        this._scale[0] = this.t_sx;
        this._scale[1] = this.t_sy;
        this._trans[0] = this.t_x;
        this._trans[1] = this.t_y;
        this._origin[0] = this.t_ox;
        this._origin[1] = this.t_oy;
        mat4.fromRotationTranslationScaleOrigin(this._matrix, this._quat, this._trans, this._scale, this._origin);
        //const ident = mat4.identity(mat4.create());
        uniforms.matrix = this._matrix;

        
        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }
}