gi.localProp = function(name, type, defaultValue) {
    var getV = function() { return localStorage[name]; },
        setV = function(v) { localStorage[name] = String(v); };
    var value = getV(),
        V = gi.val(value === undefined? defaultValue: value, type);
    
    return { set: function(v) { setV(v); V.set(v); }, get: function() { return V.get() }, type: type, v: V };
};
