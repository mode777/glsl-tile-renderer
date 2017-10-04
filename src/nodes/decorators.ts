export function input(prototype, name){
    if(!prototype.__inputs){
        prototype.__inputs = [];
    }        
    console.log(prototype, name);
    prototype.__inputs.push(name);
}
