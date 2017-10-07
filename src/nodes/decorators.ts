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

export function uniformColorSetter(arr) {
    return [arr[0]/255,arr[1]/255,arr[2]/255] 
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

export interface InputMetadata {
    name: string;
    uniformName: string;
    guiName: string;
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

export interface NodeMetadata {
    name: string,
    nodeId: string,
    constructor: new () => TextureNode;
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

export interface SerializeMetadata {
    name: string;
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