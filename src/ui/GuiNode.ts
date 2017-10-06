import * as $ from "jquery";
import "jquery-ui-browserify";

import { NodeInput } from "./NodeInput";
import { NodeManager } from "./NodeManager";
import { TextureNode } from "../nodes/TextureNode";
import { NodeImage } from "./NodeImage";
import { GuiManager } from "./GuiManager";
import { ReflectionManager } from "../model/ReflectionManager";

export class GuiNode {

    isRoot = false;

    inputs: NodeInput[] = [];
    attachedPaths: NodeInput[] = [];
    connected = false;
    
    domElement: HTMLDivElement;
    private outputDom: HTMLSpanElement;
    private thumbnail: NodeImage

    constructor(public readonly textureNode: TextureNode, private name?: string) {
        this.thumbnail = new NodeImage(textureNode, 128,128);
        this.name = this.name || this.getName();
        this.initDom();
    }

    private getName(){
        return ReflectionManager
            .getMetadata(window, "nodes")
            .filter(c => c.constructor === this.textureNode.constructor)[0]
            .name
    }

    private initDom() {
        this.domElement = document.createElement('div');
        this.domElement.classList.add('x-node');
        this.domElement.setAttribute('title', this.name);
        this.outputDom = document.createElement('span');
        this.outputDom.classList.add('x-output');
        this.outputDom.textContent = ' ';

        if (this.isRoot)
            this.outputDom.classList.add('hide');

        this.domElement.appendChild(this.outputDom);
        this.domElement.appendChild(this.thumbnail.element);
        this.domElement.onclick = (e) => GuiManager.showEditor(this.textureNode);

        this.outputDom.onclick = (e) => {
            const currentInput = NodeManager.getCurrentInput();
            if (currentInput && !this.ownsInput(currentInput)) {
                this.connectTo(currentInput);
                NodeManager.setCurrentInput(undefined);
            }
            e.stopPropagation();
        };
    }

    getOutputPoint() {
        const fchild = <HTMLDivElement>this.domElement.firstElementChild;
        const offset = NodeManager.getFullOffset(fchild);
        return {
            x: offset.left + fchild.offsetWidth / 2,
            y: offset.top + fchild.offsetHeight / 2
        };
    }

    addInput(name: string) {
        const input = new NodeInput(name, this);
        this.inputs.push(input);
        this.domElement.appendChild(input.domElement);

        return input;
    }

    detachInput(input: NodeInput) {
        input.owner.textureNode[input.name] = null;
           
        let index = -1;
        for (let i = 0; i < this.attachedPaths.length; i++) {
            if (this.attachedPaths[i] === input)
                index = i;
        }

        if (index >= 0) {
            this.attachedPaths[index].path.removeAttribute('d');
            this.attachedPaths[index].node = undefined;
            this.attachedPaths.splice(index, 1);
        }

        if (this.attachedPaths.length <= 0)
            this.domElement.classList.remove('connected');
    }

    ownsInput(input: NodeInput) {
        for (let i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i] == input)
                return true;
        }

        return false;
    }

    updatePosition() {
        const outputPt = this.getOutputPoint();

        for (let i = 0; i < this.attachedPaths.length; i++) {
            const inputPt = this.attachedPaths[i].getAttachPoint();
            const pathStr = NodeManager.createPath(inputPt, outputPt);
            this.attachedPaths[i].path.setAttributeNS(null, 'd', pathStr);
        }

        for (let j = 0; j < this.inputs.length; j++) {
            if (this.inputs[j].node === undefined) continue;

            const inputPt = this.inputs[j].getAttachPoint();
            const outputPt = this.inputs[j].node.getOutputPoint();

            const pathStr = NodeManager.createPath(inputPt, outputPt);
            this.inputs[j].path.setAttributeNS(null, 'd', pathStr);
        }
    }

    updatePreview(){
        this.thumbnail.update();
    }

    connectTo(input: NodeInput) {
        input.node = this;
        input.owner.textureNode[input.name] = this.textureNode;

        this.connected = true;
        this.domElement.classList.add('connected');

        input.domElement.classList.remove('empty');
        input.domElement.classList.add('filled');

        this.attachedPaths.push(input);

        const inputPt = input.getAttachPoint();
        const outputPt = this.getOutputPoint();

        const pathStr = NodeManager.createPath(inputPt, outputPt);
        input.path.setAttributeNS(null, 'd', pathStr);

    }

    moveTo(x: number, y: number) {
        this.domElement.style.top = y + 'px';
        this.domElement.style.left = x + 'px';
        this.updatePosition();
    }

    initUI() {
        $(this.domElement).draggable({
            containment: 'window',
            cancel: '.x-connection, .x-output, .x-input',
            drag: (e, ui) => {
                this.updatePosition();
            }
        });

        this.domElement.style.position = 'absolute';
        NodeManager.getContainer().appendChild(this.domElement);
        this.updatePosition();
    }

}