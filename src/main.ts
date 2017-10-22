import * as twgl from "twgl.js";
import * as dat from "dat-gui";

import { Tileset } from "./gl/Tileset";
import { Tilemap } from "./gl/Tilemap";

//RenderManager.init((<HTMLCanvasElement>document.getElementById("canvas")));
//const gl = RenderManager.getContext();   

(async function main(){    

    //const tiles = new TilesNode();
    //const bitmap = new BitmapNode("assets/textures/tileset.png"); 

    //tiles.input = bitmap;

    const canvas = <HTMLCanvasElement>document.getElementById("canvas"); 
    const gl = canvas.getContext("webgl");
    twgl.resizeCanvasToDisplaySize(canvas);

    const map = require("../assets/maps/map.json");
    map.tilesets[0].image = "../assets/textures/tileset.png";
    
    const tileset = new Tileset(gl, map.tilesets[0]);
    const tilemap = new Tilemap(gl, tileset, map.layers[0]);
    const t = tilemap.transform;

    t.ox = 0.5;
    t.oy = 0.5;
    //tilemap.transform.sx = 2
    //tilemap.transform.sy = 2



    const render = () => {

        //t.x += 0.005;
        //t.y += 0.005;
        //t.sx -= 0.05;
        //t.sy -= 0.05;
        t.rot += 0.05;

        tilemap.render();

        requestAnimationFrame(render);
    }

    render();
})();