import { NodeInput } from "./NodeInput";
import { TextureNode } from "../nodes/TextureNode";
import { GuiNode } from "./GuiNode";
import { ReflectionManager } from "../model/ReflectionManager";
import { GuiManager } from "./GuiManager";

interface NodeDescription {
    name: string;
    constructor: new() => TextureNode;
}

let container: HTMLElement;
let contextMenu: HTMLElement;
let svg: SVGElement;
let namespace: string;
let currentInput: NodeInput;
let guiNodes: GuiNode[] = [];
let nodes: NodeDescription[];
let current: GuiNode;

export module NodeManager {

    export function init(_container: HTMLElement) {
        nodes = ReflectionManager.getMetadata(window, "nodes");

        container = _container;
        //container.style.position = 'relative';        
        svg = <SVGElement>document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'node-graph';
        namespace = svg.namespaceURI;
        container.appendChild(svg);

        svg.onmousemove = (e) => {
            if (currentInput) {
                var path = currentInput.path;
                var inputPt = currentInput.getAttachPoint();
                var outputPt = { x: e.pageX, y: e.pageY };
                var val = createPath(inputPt, outputPt);
                path.setAttributeNS(null, 'd', val);
            }
        };

        svg.onclick = function (e) {
            if (currentInput) {
                currentInput.path.removeAttribute('d');
        
                if (currentInput.node)
                    currentInput.node.detachInput(currentInput);
        
                currentInput = undefined;
            }
        };       

        container.onmousedown = (e) => {
            hideContextMenu();
        }

        container.onkeyup = (e) => {
            if(current && e.keyCode === 46){
                deleteNode(current.textureNode);
            }
        }

        container.oncontextmenu = (e) => {
            e.preventDefault();
            showContextMenu(e.clientX, e.clientY);
        }
    }

    export function getCurrent(){
        return current;
    }

    export function setCurrent(node: GuiNode){
        if(current)
            current.setHighlight(false);

        node.setHighlight(true)
        current = node;
    }

    export function showContextMenu(x: number, y: number){
        if(contextMenu)
            hideContextMenu();

        contextMenu = document.createElement("div");
        contextMenu.classList.add("x-node");
        contextMenu.id = "context-menu";
        contextMenu.style.left = (x-10)+"px";
        contextMenu.style.top = (y-10)+"px";
        contextMenu.setAttribute("title", "Add Node...");
        contextMenu.onmousedown = (e) => {
            e.stopPropagation();
        }

        nodes.forEach(node => {
            const item = document.createElement("div");
            item.innerHTML = node.name
            item.classList.add("item");
            contextMenu.appendChild(item);
            item.onclick = (e) => {
                addNode(new node.constructor(), x, y, node.name);
                hideContextMenu();
            };
        })

        container.appendChild(contextMenu);
    }

    export function hideContextMenu(){
        if(contextMenu){
            container.removeChild(contextMenu);
            contextMenu = null;
        }
    }

    export function clearInput(input: NodeInput){
        if (input.path.hasAttribute('d'))
            input.path.removeAttribute('d');
        if (input.node) {
            input.node.detachInput(input);
            input.node = undefined;
        }
    }

    export function deleteNode(node: TextureNode){      
        let removeIdx = -1;

        guiNodes.forEach((gui, index) => {            
            if(gui.textureNode === node){
                removeIdx = index;
                gui.inputs.forEach(input => {
                    gui.detachInput(input);
                    clearInput(input);
                })
            }
            else {
                gui.inputs.forEach(input => {
                    if(input.node && input.node.textureNode === node){
                        gui.detachInput(input);
                        clearInput(input);
                        input.domElement.classList.remove('filled');
                        input.domElement.classList.add('empty');
                        gui.textureNode[input.name] = null;
                    }
                })
            }
        });
        guiNodes[removeIdx].destroy();
        guiNodes.splice(removeIdx, 1);
        GuiManager.closeEditor();
    }

    export function addNode(node: TextureNode, x = 100, y = 100, name?: string){
        const existing = guiNodes.filter(x => x.textureNode === node)[0]
        if(existing)
            return existing;

        const gui = new GuiNode(node, name);
        guiNodes.push(gui);
        
        let ctr = 0;
        ReflectionManager.getMetadata(node, "inputs")
            .forEach(input => {
                gui.addInput(input.name);
                if(node[input.name]){
                    const peer = addNode(node[input.name]);
                    peer.connectTo(gui.inputs[ctr]);
                }
                ctr++;
            });
        
        gui.moveTo(x,y);
        gui.initUI();
        
        return gui;
    }

    export function update(){
        guiNodes.forEach(x => x.update());
    }

    export function getNamespace() {
        return namespace;
    }

    export function getContainer(){
        return container;
    }

    export function createPath(a, b) {
        var diff = {
            x: b.x - a.x,
            y: b.y - a.y
        };

        var pathStr = [
            'M' + a.x + ',' + a.y + ' C',
            a.x + diff.x / 3 * 2 + ',' + a.y + ' ',
            a.x + diff.x / 3 + ',' + b.y + ' ',
            b.x + ',' + b.y
        ].join('');

        return pathStr;
    }

    export function addPath(element: SVGPathElement){
        svg.appendChild(element);
    }

    export function getFullOffset(e: HTMLElement) {
        var offset = {
            top: e.offsetTop,
            left: e.offsetLeft
        };
    
        if (e.offsetParent) {
            var parentOff = getFullOffset(<HTMLElement>e.offsetParent);
            offset.top += parentOff.top;
            offset.left += parentOff.left;
        }
    
        return offset;
    }

    export function getCurrentInput(){
        return currentInput;
    }

    export function setCurrentInput(input: NodeInput){
        currentInput = input;
    }
}