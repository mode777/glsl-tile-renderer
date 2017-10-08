export module Helpers {
    //http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    export function hash(val: string){
        var hash = 0, i, chr;
        if (val.length === 0) return hash;
        for (i = 0; i < val.length; i++) {
          chr   = val.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
    } 
}