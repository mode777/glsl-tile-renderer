export interface GuiOptions {
    onChange?: (any, value) => void;
    min?: number,
    max?: number,
    step?: number,
    type?: string
}

export function gui(options?: GuiOptions){
    options = options ? options : {};
    
    return function gui(prototype, name){
        if(!prototype.__gui){
            prototype.__gui = [];
        }        
        prototype.__gui.push({
            name: name,
            options: options
        });
    }
}

