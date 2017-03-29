var gi = (function() {
var emptyFn = function() {};

var fval = function(el) {
    while(typeof el == "function") el = el();
    return el;
};

var applyProps = function(el, props) {
    var concatElems = function(l1, l2) {
        var norm = function(el) {return (el instanceof Array)? el: [el]}
        return (l1 === undefined)
            ?((l2 === undefined)? []      : norm(l2))
            :((l2 === undefined)? norm(l1): norm(l1).concat(norm(l2)))
    };
    var getUnique = function(arr) {
        var o = {}, a = [], i, e;
        for (i = 0; e = arr[i]; i++) {o[e] = 1};
        for (e in o) {a.push (e)};
        return a;
    }
    var computeStyle = function(st) {
        if(st === undefined) return "";
        if(typeof st == "string") return st;
        var ret = "";
        for(var i in st) {if(!st.hasOwnProperty(i)) continue;
            ret += i + ":" + fval(st[i]) + ";";
        }
        return ret;
    }
    
    if(!el.events) el.events = {};
    if(!el.attrs) el.attrs = {};
    for(var i in props) { if(!props.hasOwnProperty(i) || i == "is" || i == "$changes") continue;
        if(i == "class") {
            var cl = fval(props[i]).replace(/\./g, " ").trim();
            if(el.attrs["class"]) el.attrs["class"] += " " + cl;
            else el.attrs["class"] = cl;
        } else if(i == "id") {
            el.attrs.id = fval(props.id)
        } else if(i == "tag" || i == "key") {
            el[i] = fval(props[i]);
        } else if(i == "children") {
            el.children = concatElems(el.children, props[i]);
        } else if(i.slice(0, 2) == "on") {
            el.events[i.slice(2)] = concatElems(el.events[i.slice(2)], props[i]);
        } else if(i == "style") {
            el.attrs.style = computeStyle(el.attrs.style) + computeStyle(fval(props.style));
        } else {
            el.attrs[i] = fval(props[i]);
        }
    };
    if(!el.attrs.id) delete el.attrs.id;
    if(el.attrs.class) {
        el.attrs.class = el.attrs.class.replace(/^\s+/, "").replace(/\s+$/, "");
        el.attrs.class = getUnique(el.attrs.class.split(" ")).join(" ");
    }
    if(!el.attrs.class) delete el.attrs.class;
    return el;
};

var applyChanges = function(el, changes) {
    if(!changes) return el;
    var childs = changes.childs || [];
    delete changes.childs;
    changes.is = el;
    return gi(changes, childs);
};
var computeFragments = function(arr) {
    var chlds = [];
    for(var i = 0; i < arr.length; i++) {
        var el = arr[i];
        if(el instanceof Array) chlds = chlds.concat(computeFragments(el));
        else if(typeof el != "function") {
            chlds.push(String(el));
        }
        else {chlds.push(el)};
    };
    return chlds;
};

var gi = function(blablabla) {
    var args = arguments;
    var el = args[0];
    var newel;

    var self = function() {
        var chlds = computeFragments(Array.prototype.slice.call(args, 1));
        if(newel) return newel(chlds);
        el = fval(el);
        var ret = {
            events: {},
            attrs: {},
            children: chlds
        };
        
        var tgid = (el.is.match(/#[\w-_&\$+\d]*\b/g) || [""])[0].slice(1);
        var tgclass = (el.is.match(/\.[\w-_&\$+\d]*\b/g) || [""]).join("").replace(/\./g, " ").trim();
        
        if(!el.id && tgid) el.id = tgid;
        if(el["class"] && tgclass) { 
            var c = el["class"]; el["class"] = function() {return tgclass + " " + fval(c); };
        }
        else if(!el["class"] && tgclass) el["class"] = tgclass;
        el.tag = (el.is.match(/[-_&$]|\w+|\d*[#|\.|\D*]/) || [""])[0].replace(/[#|\.|\s*]/, '') || "div";
        applyProps(ret, el);
        return ret;
    };
    
    if(el instanceof Array) newel = function(chlds) {
        return {children: computeFragments(el).concat(chlds)}
    };
    else if(el == "<" && el == "!") newel = function(chlds) {
        return {tag: el, children: chlds}
    };
    else if(typeof el == "string" || typeof el == "function") el = {is: el};
    if(typeof el.is == "function")  newel = function(chlds) {
        el.children = chlds;
        return applyProps(fval(el.is), el)
    };
    
    if(el.$changes) { self = applyChanges(self, el.$changes); }
    
    return self;
};

var val = function(v, type) {
    if(type) this.type = type;
    this.value = v;
    return this;
};
val.prototype = {
    type: function(v) {return v},
    get: function() {
        return this.type(this.value);
    },
    set: function(v) {
        this.value = v;
    },
    toString: function() {return String(this.get())}
};

gi.ready = function(fn) { document.addEventListener("DOMContentLoaded", fn); };
gi.vdom = cito.vdom;
gi.val = function(v, type) {return new val(v, type)};

return gi;

}());

