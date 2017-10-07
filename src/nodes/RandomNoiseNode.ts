import { node, gui, uniform } from "./decorators";
import { ShaderNode } from "./ShaderNode";
import { track } from "../model/Trackable";

@node({ name: "RandomNoise", nodeId: "core.random" })
export class RandomNoiseNode extends ShaderNode {

    @track() @gui({min: 0, max: 1, step: 0.01}) @uniform()
    seed = 0;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/basic/noise.glsl"), width, height);
    }          
    
}