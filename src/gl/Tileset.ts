import * as twgl from "twgl.js";

export interface TilesetOptions {
    tilewidth: number,
    tileheight: number,
    imageheight: number,
    imagewidth: number,
    image: string,
    interpolation?: number
}

export class Tileset {

    public readonly texture: WebGLTexture;
    public readonly size: number[];
    public readonly tileSize: number[];

    constructor(
        private gl: WebGLRenderingContext, 
        private options: TilesetOptions
    ){
        this.size = [Math.floor(options.imagewidth / options.tilewidth), Math.floor(options.imageheight / options.tileheight)];
        this.tileSize = [options.tilewidth, options.tileheight];
        this.texture = twgl.createTexture(gl, {
            src: options.image,
            minMag: options.interpolation || gl.LINEAR
        });
    }

}