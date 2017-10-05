import { ReflectionManager } from "../model/ReflectionManager";

export interface GuiOptions {
    onChange?: (any, value) => void;
    min?: number,
    max?: number,
    step?: number,
    type?: string,
    name?: string,
    constraints?: any
}

export function gui(options?: GuiOptions){
    options = options ? options : {};
    
    return function gui(instance, name){
        ReflectionManager.addMetadata(instance, "gui", {
            name: name,
            options: options
        });
    }
}

export function input(instance, name) {
    ReflectionManager.addMetadata(instance, "inputs", name);
}

export function node(name?: string) {

    return function decorator(constructor: any) {
        ReflectionManager.addMetadata(window, "nodes", { 
            name: name || constructor.name, 
            constructor: constructor 
        });
    }
}