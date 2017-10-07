import { ReflectionManager } from "../model/ReflectionManager";
import { TextureNode } from "./TextureNode";
import { RenderManager } from "../gl/RenderManager";

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
    
    return (instance, name) => {
        ReflectionManager.addMetadata(instance, "gui", {
            name: name,
            options: options
        });
    }
}

export interface uniformOptions {
    setter?: (val: any) => any;
    uniformName?: string;
}

export function uniform(options?: uniformOptions){
    options = options || {};

    return (instance, name) => {
        ReflectionManager.addMetadata(instance, "uniforms", {
            name: name,
            uniformName: options.uniformName || name,
            setter: options.setter || ((val) => val)
        });
    }
}

export interface InputOptions {
    uniformName?: string;
    guiName?: string;
}

export function input(options?: InputOptions){
    options = options || {};
    
    return (instance, name) => {
        ReflectionManager.addMetadata(instance, "inputs", {
            name: name,
            guiName: options.guiName || name,
            uniformName: options.uniformName || name 
        });
    }
}

export interface NodeOptions {
    name?: string;
    nodeId?: string;
}

export function node(options?: NodeOptions) {
    options = options || {};

    return (constructor: any) => {
        ReflectionManager.addMetadata(constructor, "node", name); 
        ReflectionManager.addMetadata(window, "nodes", { 
            name: options.name || constructor.name,
            nodeId: options.nodeId || options.name || constructor.name, 
            constructor: constructor 
        });
    }
}

export interface SerializeOptions {

}

export function serialize(options?: SerializeOptions){
    options = options || {};
    
    return (instance, name) => {
        ReflectionManager.addMetadata(instance, "serialize", {
            name: name,
        });
    }
}

export interface InitializeOptions {

}

export function initialize(options?: InitializeOptions){
    options = options || {};
    
    return (instance, name) => {
        ReflectionManager.addMetadata(instance, "initialize", {
            name: name,
        });
    }
}