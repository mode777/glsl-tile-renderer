export function gui(prototype, name){
    if(!prototype.__gui){
        prototype.__gui = [];
    }
    
    prototype.__gui.push(name);
}