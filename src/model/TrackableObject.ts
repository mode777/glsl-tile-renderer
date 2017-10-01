

export function track(prototype, name){
    if(!prototype.__tracked){
        prototype.__tracked = {};
    }
    
    prototype.__tracked[name] = true;
}

export abstract class Trackable {

    private _lastState = {};
    private _currentState = {};
    private _changes: string[];
    
    private get _tracked() { return this["__tracked"] ? Object.keys(this["__tracked"]) : []; }

    public get changes(){
        //this._tracked.forEach(x => this._currentState[x] = this[x]);
        this._changes = this._tracked.filter(x => {
            const current = this[x];
            this._currentState[x] = current;
            const propertyChanged = current !== this._lastState[x];

            if(!propertyChanged && current instanceof Trackable){
                return current.hasChanges;
            }

            return propertyChanged;
        });
        return this._changes;
    }
    
    public get hasChanges(){
        return this.changes.length > 0;
    }
    
    protected setUpdated(){
        this._changes = null;
        this._lastState = this._currentState;
        this._currentState = {};
    }
}