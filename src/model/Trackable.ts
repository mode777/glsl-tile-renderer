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
    private _revision = 0;
    private _marked = false;
    
    private get _tracked() { return this["__tracked"] ? Object.keys(this["__tracked"]) : []; }

    public get changes(){
        this._changes = this._tracked.filter(x => {
            const current = this[x];
            if(current instanceof Trackable){
                this._currentState[x] = {
                    instance: current,
                    revision: current._revision 
                }
                return this._trackableChanged(x, current);
            }
            else {
                this._currentState[x] = current;
                return current !== this._lastState[x]
            }
        });
        return this._changes;
    }

    private _trackableChanged(key: string, trackable: Trackable){
        const present = typeof(this._lastState[key]) === "object";
        const instanceChanged = present && this._lastState[key].instance !== trackable;
        const revisionChanged = present && !instanceChanged && this._lastState[key].revision !== trackable._revision;
        const hasChanges = present && !instanceChanged && this._lastState[key].instance.hasChanges;

        const hasChanged = !present || instanceChanged || revisionChanged || hasChanges;

        return  hasChanged;
    }

    get revision(){
        return this._revision;
    }

    public get hasChanges(){
        return this.changes.length > 0 || this._marked;
    }

    public markChanged(){
        this._marked = true;
    }
    
    protected setUpdated(){
        this._marked = false;
        this._revision++;
        this._changes = null;
        this._lastState = this._currentState;
        this._currentState = {};
    }
}