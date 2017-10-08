import { TextureNode, NodeMetadata, InputMetadata, SerializeMetadata } from "../nodes/index";
import { GuiNode } from "../ui/index";
import { ReflectionManager } from "../model/ReflectionManager";

const VERSION = "1.0.0";

export interface JsonNode {
    typeId: string;
    id: string;
    properties?: any;
    inputs?: any;
}

export interface JsonGuiNode {
    x?: number;
    y?: number;
    node: JsonNode;
}

export interface JsonMaterial {
    version?: string,
    author?: string,
    name?: string,
    date?: string;
    nodes: JsonGuiNode[] 
}

export interface SerializationOptions {
    name?: string;
    author?: string;
}

export module SerializationManager {

    function serializeGuiNode(gui: GuiNode, metadata: NodeMetadata) {
        const result: JsonGuiNode = {
            x: gui.x,
            y: gui.y,
            node: serializeNode(gui.textureNode, metadata)
        } 
        return result;
    }

    function serializeNode(node: TextureNode, metadata: NodeMetadata) {
        const inputs = <InputMetadata[]>ReflectionManager.getMetadata(node, "inputs");
        const serialize = <SerializeMetadata[]> ReflectionManager.getMetadata(node, "serialize");
        
        const inputsResults = {}; 
        const serializeResults = {}; 

        inputs.forEach(x => inputsResults[x.name] = node[x.name] ? node[x.name]._id : null);
        serialize.forEach(x => serializeResults[x.name] = node[x.name]);

        const result: JsonNode = {
            id: node._id,
            typeId: metadata.nodeId,
            inputs: inputsResults,
            properties: serializeResults
        }
        
        return result;
    }
    
    export function serialize(nodes: GuiNode[], options?: SerializationOptions){
        options = options || {};
        
        const result: JsonMaterial = {
            author: options.author,
            date: new Date().toISOString(),
            name: options.name,
            version: VERSION,
            nodes: []
        } 
        
        const metadata = <NodeMetadata[]>ReflectionManager.getMetadata(window, "nodes");
        const ids = {};

        nodes.forEach(gui => {
            if(ids[gui.textureNode._id])
                return;

            const meta = metadata.filter(x => x.constructor === gui.textureNode.constructor)[0];
            result.nodes.push(serializeGuiNode(gui,meta));
            ids[gui.textureNode._id] = true;
        });

        console.log(result);
        return JSON.stringify(result);
    }

}