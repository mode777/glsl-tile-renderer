import { track } from "../model/Trackable";
import { Framebuffer } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { gui } from "./decorators";

const sizeConstraints = [
    4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048
]

export abstract class ShaderNode extends TextureNode {
    
    @track protected framebuffer: Framebuffer;  
    @gui({constraints: sizeConstraints}) protected width;
    @gui({constraints: sizeConstraints}) protected height

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
        this.framebuffer.refresh()
        return this.framebuffer.texture;
    }
}