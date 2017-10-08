import { TextureNode } from "../nodes/TextureNode";
//import * as dat from "dat-gui"
//import  "dat.gui/build/dat.gui.min";
import { ReflectionManager } from "../model/ReflectionManager";

const dat = require("dat.gui/build/dat.gui.min");

let gui: dat.GUI;
console.log(dat);

export module GuiManager {
    
    export function closeEditor(){
        if(gui){
            gui.destroy();
            gui = null;
        }
    }

    export function showEditor(node: TextureNode){
        closeEditor();
        gui = new dat.GUI({
            width: 256
        });
        gui.domElement.oncontextmenu = (e) => {
            e.stopPropagation();
        }
        gui.domElement.onkeyup = (e) => {
            e.stopPropagation();
        }

        ReflectionManager.getMetadata(node, "gui").forEach(editor => {      
            let controller: dat.GUIController;
            if(editor.options.type === 'color'){
                controller = gui.addColor(node, editor.name)
            }
            else {
                controller = gui.add(node, editor.name, editor.options.min, editor.options.max)
            }
            if(editor.options.step){
                controller.step(editor.options.step)
            }
            if(editor.options.name)
                controller.name(editor.options.name);
            if(editor.options.constraints)
                controller.options(editor.options.constraints)
            if(editor.options.onChange)
                controller.onChange(() => editor.options.onChange.call(node) );
        });
        
    }
    
}