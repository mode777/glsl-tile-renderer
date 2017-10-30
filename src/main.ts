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

    const map = require("../assets/maps/map6.json");
    map.tilesets[0].image = "../assets/textures/grass_dirt.png";
    map.tilesets[0].interpolation = gl.LINEAR;
    
    const tileset = new Tileset(gl, map.tilesets[0]);
    const tilemap = new Tilemap(gl, tileset, map.layers[0]);
    const t = tilemap.transform;
    
    t.ox = 0.5;
    t.oy = 0.5;
    //tilemap.transform.sx = 0.0525
    //tilemap.transform.sy = 0.0525
    tilemap.transform.sx = 1;
    tilemap.transform.sy = 1;

    let drag = false;
    let lastPos = null;

    // gl.canvas.onmousewheel = (e) => {
    //     var offset = 1. + e.wheelDelta * 0.001;
    //     t.sx *= offset;
    //     t.sy *= offset;
    // }

    // gl.canvas.onmouseleave = () => drag = false;
    // gl.canvas.onmouseup = (e) => {
    //     drag = false;
    // }

    // gl.canvas.onmousedown = (e) => {
    //     if(e.button !== 0)
    //         return;

    //     drag = true;
    //     lastPos = [e.clientX, e.clientY];
    // }

    // gl.canvas.onmousemove = (e) => {
    //     if(!drag)
    //     return;
        
    //     const offset = [ e.clientX - lastPos[0], e.clientY - lastPos[1] ];
        
    //     t.x += offset[0] / (tileset.size[0] * tileset.tileSize[0]);
    //     t.y += offset[1] / (tileset.size[1] * tileset.tileSize[1]);

    //     lastPos = [e.clientX, e.clientY];
    // }


    const render = (time) => {
        stats.begin();

        const scale = Math.sin(time /5000) * 1.5 + 1.8;
        
        
        t.sx = scale;
        t.sy = scale;  
        //t.sx -= 0.0005;
        //t.sy -= 0.0005;
        t.rot += 0.005;

        //t.x += 0.001;
        //t.y += 0.001;
        //x += 0.5;
        //y += 0.5;
        //t.x = Math.floor(x)/256;
        //t.y = Math.floor(y)/256;
    
        tilemap.render(time);
        //tilemap.render();

        requestAnimationFrame(render);
        stats.end();
    }

    render(0);
})();