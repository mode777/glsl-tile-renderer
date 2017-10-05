import { TextureNode } from "../nodes/TextureNode";
import * as dat from "dat-gui";
import { ReflectionManager } from "../model/ReflectionManager";

let gui: dat.GUI;

export module GuiManager {
    
    export function showEditor(node: TextureNode){
        if(gui){
            gui.destroy();
            gui = null;
        }
        gui = new dat.GUI({
            width: 256
        });
        gui.domElement.oncontextmenu = (e) => {
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
            controller.onChange(editor.options.onChange);
        });
        
    }
    
}