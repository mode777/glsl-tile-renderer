import * as twgl from "twgl.js";

export interface TilesetOptions {
    tilewidth: number,
    tileheight: number,
    imageheight: number,
    imagewidth: number,
    image: string
}

export class Tileset {

    public readonly texture: WebGLTexture;
    public readonly size: number[];
    public readonly tileSize: number[];

    constructor(
        private gl: WebGLRenderingContext, 
        private options: TilesetOptions
    ){
        this.size = [options.imagewidth, options.imageheight];
        this.tileSize = [options.tilewidth, options.tileheight];
        this.texture = twgl.createTexture(gl, {
            src: options.image,
            minMag: gl.LINEAR
        });
    }

}