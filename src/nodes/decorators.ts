export function input(prototype, name) {
    if (!prototype.__inputs) {
        prototype.__inputs = [];
    }
    prototype.__inputs.push(name);
}

export function node(name?: string) {

    return function decorator(constructor: any) {
        name = name || constructor.name;
        console.log(name);
        return constructor;
    }
}