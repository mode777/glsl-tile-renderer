import * as twgl from "twgl.js";
import Stats = require("stats.js");

import { Tileset } from "./gl/Tileset";
import { Tilemap } from "./gl/Tilemap";

//RenderManager.init((<HTMLCanvasElement>document.getElementById("canvas")));
//const gl = RenderManager.getContext();   

(async function main(){    

    var stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );

    const canvas = <HTMLCanvasElement>document.getElementById("canvas"); 
    const gl = canvas.getContext("webgl");
    //twgl.resizeCanvasToDisplaySize(canvas);

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
        stats.begin();
        t.x += 0.005;
        t.y += 0.005;
        //t.sx -= 0.05;
        //t.sy -= 0.05;
        //t.rot += 0.05;

        tilemap.render();

        requestAnimationFrame(render);
        stats.end();
    }

    render();
})();