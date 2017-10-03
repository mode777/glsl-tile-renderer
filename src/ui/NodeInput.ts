import { GuiNode } from "./GuiNode";
import { NodeManager } from "./NodeManager";

export class NodeInput {
    node: GuiNode;
    domElement: HTMLDivElement;
    path: SVGPathElement;

    constructor(public readonly name: string) {
        this.initDom();
    }

    private initDom() {
        this.domElement = document.createElement('div');
        this.domElement.textContent = this.name;
        this.domElement.title = this.name;

        this.domElement.classList.add('x-connection');
        this.domElement.classList.add('empty');

        this.path = <SVGPathElement><any>document.createElementNS(NodeManager.getNamespace(), 'path');
        this.path.setAttributeNS(null, 'stroke', '#8e8e8e');
        this.path.setAttributeNS(null, 'stroke-width', '2');
        this.path.setAttributeNS(null, 'fill', 'none');
        NodeManager.addPath(this.path);

        this.domElement.onclick = (e) => {
            const currentInput = NodeManager.getCurrentInput();
            if (currentInput) {
                if (currentInput.path.hasAttribute('d'))
                    currentInput.path.removeAttribute('d');
                if (currentInput.node) {
                    currentInput.node.detachInput(currentInput);
                    currentInput.node = undefined;
                }
            }

            NodeManager.setCurrentInput(this);
            if (this.node) {
                this.node.detachInput(this);
                this.domElement.classList.remove('filled');
                this.domElement.classList.add('empty');
            }

            e.stopPropagation();
        };
    }

    getAttachPoint() {
        var offset = NodeManager.getFullOffset(this.domElement);
        return {
            x: offset.left + this.domElement.offsetWidth - 2,
            y: offset.top + this.domElement.offsetHeight / 2
        };
    }
}