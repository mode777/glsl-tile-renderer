const store = {};

function findAllParents(constructor: any, list?: string[]) {
    list = list || [];

    if (constructor && constructor.name && constructor.name != " " && constructor.name != "") {
        findAllParents(Object.getPrototypeOf(constructor), list);
        list.push(getTypeId(constructor))
    }
    return list;
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getTypeId(constructor: any) {
    if (!constructor.hasOwnProperty("__typeId")){
        constructor["__typeId"] = uuidv4();
    }
    return constructor["__typeId"];
}

export module ReflectionManager {

    export function addMetadata(target: any, key: string, value: any) {
        const typeId = getTypeId(target.constructor);
        store[typeId] = store[typeId] || {};
        store[typeId][key] = store[typeId][key] || [];
        store[typeId][key].push(value);
    }

    export function getMetadata(target: any, key: string) {
        let result = [];
        findAllParents(target.constructor).forEach(typeId => {
            if (store[typeId] && store[typeId][key]) {
                result = result.concat(store[typeId][key]);
            }
        });
        return result;
    }

}