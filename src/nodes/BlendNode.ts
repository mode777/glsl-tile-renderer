import * as twgl from "twgl.js";
import { Framebuffer, RenderManager } from "../gl/index";
import { TextureNode } from "./TextureNode";
import { track } from "../model/Trackable";
import { input, gui, node, uniform, serialize } from "./decorators";
import { ShaderNode } from "./ShaderNode";
import { ColorNode } from "./ColorNode";

enum BlendMode {
    Normal = 0, 
    Lighten = 1,
    Darken = 2,
    Multiply = 3,
    Average = 4,
    Add = 5,
    Subtract = 6,
    Difference = 7,
    Negation = 8,
    Exclusion = 9, 
    Screen = 10,
    Overlay = 11,
    SoftLight = 12,
    HardLight = 13,
    ColorDodge = 14,
    ColorBurn = 15,
    LinearDodge = 16,
    LinearBurn = 17,
    LinearLight = 18,
    VividLight = 19,
    PinLight = 20,
    HardMix = 21,
    Reflect = 22,
    Glow = 23,
    Phoenix = 24,
    Hue = 25,
    Saturation = 26,
    Color = 27,
    Luminosity = 28
}

@node({name: "Blend", nodeId: "core.blend"})
export class BlendNode extends ShaderNode {

    @track() @input({ uniformName: "texture0" })
    input0: TextureNode;

    @track() @input({ uniformName: "texture1" })
    input1: TextureNode;

    @track() @input() 
    map: TextureNode;

    @track() @gui({min: 0, max: 1, step: 0.01}) @uniform() @serialize()
    opacity = 0.5;

    @track() 
    @gui({ constraints: { 
        Normal: BlendMode.Normal, 
        Lighten: BlendMode.Lighten,
        Darken: BlendMode.Darken,
        Multiply: BlendMode.Multiply,
        Average: BlendMode.Average,
        Add: BlendMode.Add,
        Subtract: BlendMode.Subtract,
        Difference: BlendMode.Difference,
        Negation: BlendMode.Negation,
        Exclusion: BlendMode.Exclusion, 
        Screen: BlendMode.Screen,
        Overlay: BlendMode.Overlay,
        SoftLight: BlendMode.SoftLight,
        HardLight: BlendMode.HardLight,
        ColorDodge: BlendMode.ColorDodge,
        ColorBurn: BlendMode.ColorBurn,
        LinearDodge: BlendMode.LinearDodge,
        LinearBurn: BlendMode.LinearBurn,
        LinearLight: BlendMode.LinearLight,
        VividLight: BlendMode.VividLight,
        PinLight: BlendMode.PinLight,
        HardMix: BlendMode.HardLight,
        Reflect: BlendMode.Reflect,
        Glow: BlendMode.Glow,
        Phoenix: BlendMode.Phoenix,
        //Hue: BlendMode.Hue,
        //Saturation: BlendMode.Saturation,
        //Color: BlendMode.Color,
        //Luminosity: BlendMode.Luminosity
    }})
    mode: BlendMode = BlendMode.Normal;

    constructor(width = 256, height = 256){
        super(require("../../assets/shaders/blending/normal.glsl"), width, height);
    }          
    
    protected refresh(){
        this.mode = parseInt(<any>this.mode);
        switch (this.mode) {
            case BlendMode.Normal:
                this.framebuffer.setShader(require("../../assets/shaders/blending/normal.glsl"));
                break;
            case BlendMode.Multiply: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/multiply.glsl"));
                break;
            case BlendMode.Add: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/add.glsl"));
                break;
            case BlendMode.Average: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/average.glsl"));
                break;
            case BlendMode.ColorBurn: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/color-burn.glsl"));
                break;
            case BlendMode.ColorDodge: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/color-dodge.glsl"));
                break;
            case BlendMode.Darken: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/darken.glsl"));
                break;
            case BlendMode.Difference: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/difference.glsl"));
                break;
            case BlendMode.Exclusion: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/exclusion.glsl"));
                break;
            case BlendMode.Glow:
                this.framebuffer.setShader(require("../../assets/shaders/blending/glow.glsl"));
                break;
            case BlendMode.HardLight: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/hard-light.glsl"));
                break;
            case BlendMode.HardMix: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/hard-mix.glsl"));
                break;
            case BlendMode.Lighten: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/lighten.glsl"));
                break;
            case BlendMode.LinearBurn: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/linear-burn.glsl"));
                break;
            case BlendMode.LinearDodge: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/linear-dodge.glsl"));
                break;
            case BlendMode.LinearLight: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/linear-light.glsl"));
                break;
            case BlendMode.Negation: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/negation.glsl"));
                break;
            case BlendMode.Overlay: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/overlay.glsl"));
                break;
            case BlendMode.Phoenix:
                this.framebuffer.setShader(require("../../assets/shaders/blending/phoenix.glsl"));
                break;
            case BlendMode.PinLight: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/pin-light.glsl"));
                break;
            case BlendMode.Reflect: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/reflect.glsl"));
                break;
            case BlendMode.Screen: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/screen.glsl"));
                break;
            case BlendMode.SoftLight: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/soft-light.glsl"));
                break;
            case BlendMode.Subtract: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/subtract.glsl"));
                break;
            case BlendMode.VividLight: 
                this.framebuffer.setShader(require("../../assets/shaders/blending/vivid-light.glsl"));
                break;
            default:
                throw "Unsupported blend mode"
        }
        return super.refresh();
    }
}