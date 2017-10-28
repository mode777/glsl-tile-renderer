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
    const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false
    });
    //twgl.resizeCanvasToDisplaySize(canvas);

    const map = require("../assets/maps/map4.json");
    map.tilesets[0].image = "../assets/textures/terrain_atlas.png";
    map.tilesets[0].interpolation = gl.LINEAR;
    
    const tileset = new Tileset(gl, map.tilesets[0]);
    const tilemap = new Tilemap(gl, tileset, map.layers[0]);
    const t = tilemap.transform;
    
    const map2 = require("../assets/maps/map2.json");
    const tilemap2 = new Tilemap(gl, tileset, map2.layers[0]);
    tilemap2.transform = tilemap.transform;

    let x = 0;
    let y = 0;

    t.ox = 0.5;
    t.oy = 0.5;
    tilemap.transform.sx = 0.0525
    tilemap.transform.sy = 0.0525
    tilemap.transform.sx = 1;
    tilemap.transform.sy = 1;

    const render = () => {
        stats.begin();
        //t.sx -= 0.0005;
        //t.sy -= 0.0005;
        //t.rot += 0.005;

        t.x += 0.001;
        t.y += 0.001;
        //x += 0.5;
        //y += 0.5;
        //t.x = Math.floor(x)/256;
        //t.y = Math.floor(y)/256;
    
        tilemap2.render();
        tilemap.render();

        requestAnimationFrame(render);
        stats.end();
    }

    render();
})();