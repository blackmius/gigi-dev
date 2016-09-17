var bindValues = function(args) {
    var onset = () => {};
    var onget = () => {};
    var observers = arguments;
    var setVal = (v) => {
        for(var i = 0; i < observers.length; i++) {
            var observer = observers[i];
            observer.value = v;
            observer.onset(v, observer);
            observer.isupdated = false;

        }
    }
    for(var i = 0; i < observers.length; i++) {
        var observer = observers[i];
        observer.set.push(function(v) {
            if(!observer.isupdated) {
                observer.isupdated = true;
                setVal(v)
            }
        });
        observer.set.push(() => onset());
        observer.get.push(() => onget());
    };
    var binder = {onset: (fn) => {onset = fn; return binder}, onget: (fn) => {onget = fn; return binder}};
    return binder;
};

var Observer = function(obj, prop, cb) {
    var toArr = function(el) {
        if(el instanceof Array) return el;
        if(!(el instanceof Function)) return [() => {}];
        return [el];
    };
    if(!cb) cb = {}; 
    cb.set = toArr(cb.set);
    cb.get = toArr(cb.get);
    var onset = (v) => {for(var i = 0; i < cb.set.length; i++) cb.set[i](v, state)};
    var onget = () => {for(var i = 0; i < cb.get.length; i++) {
        var g = cb.get[i](state); if(g !== undefined) {onset(g); state.value = g;}
    }};
    var state = {value: obj[prop], obj: obj, prop: prop, get: cb.get, set: cb.set, onget: onget, onset: onset};
    Object.defineProperty(obj, prop, {
        set: (v) => {state.value = v; onset(v);},
        get: () => {onget(); return state.value}
    });
    return state
};
