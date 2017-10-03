export function input(prototype, name){
    if(!prototype.__inputs){
        prototype.__inputs = [];
    }        
    prototype.__inputs.push(name);
}
