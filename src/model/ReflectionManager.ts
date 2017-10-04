const store = {};

function findAllParents(constructor: any, list?: string[]){
    list = list || [];
    if(constructor && constructor.name && constructor.name !== "" ){
        findAllParents(Object.getPrototypeOf(constructor), list);
        list.push(constructor.name)
    }
    return list;
}

export module ReflectionManager {
    export function addMetadata(target: any, key: string, value: any){
        const name = target.constructor.name;
        store[name] = store[name] || {};
        store[name][key] = store[name][key] || [];
        store[name][key].push(value);
    }
    
    export function getMetadata(target: any, key: string) {
        let result = [];
        findAllParents(target.constructor).forEach(name => {
            if(store[name] && store[name][key]){
                result = result.concat(store[name][key]);
            }
        });
        return result;
    }
    
}