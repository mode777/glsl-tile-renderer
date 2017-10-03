import { NodeInput } from "./NodeInput";

let container: HTMLElement;
let svg: SVGElement;
let namespace: string;
let currentInput: NodeInput;

export module NodeManager {

    export function init(_container: HTMLElement) {
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
            console.log((<HTMLElement>e.offsetParent).offsetTop, e.offsetParent);
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