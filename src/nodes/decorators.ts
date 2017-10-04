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

export function input(prototype, name) {
    if (!prototype.__inputs) {
        prototype.__inputs = [];
    }
    prototype.__inputs.push(name);
}

export function node(name?: string) {

    return function decorator(constructor: any) {
        name = name || constructor.name;
        return constructor;
    }
}