var objmerge = function(obj1, obj2) {
    var obj3 = {};
    obj1 = obj1 || {};
    obj2 = obj2 || {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
};

var updateChildrens = function(el) {
    //recursively updates component's childrens
    var ch = el.children;
    if((el.self || {}).is == "gigi-component") {
        UPDTHIS(el.self);
    }
    if(!ch || typeof ch != "object") return;
    if(!ch.length) {
        updateChildrens(ch);
        return;
    }
    for(var i = 0; i < ch.length; i++) {
        updateChildrens(ch[i]);
    }
};

var setProp = function(el, prop, val) {
    el.$p[prop] = val;  
    updateComponent(el);
};

var UPDTHIS = function(el) {
    cito.vdom.update(el.node, gigi_rootElement(el.root(el))); //UPDATES THIS FUCKING ELEMENT!
}

var updateComponent = function(el) {
    updateChildrens(el.node);
    //UPDTHIS(el)
};

var applyPropsFor = function(el, props, d) {
    for(var i in props) {
        prop = props[i];
        if(["events", "attrs", "children", "key"].indexOf(i) == -1 && d == 0) continue;
        if(i in el) {
            if(typeof prop == "object" && el[i]) {                
                if(i in el) applyPropsFor(el[i], prop, d + 1);
                else el[i] = prop;
                
            } else {
                if(el[i]) {
                    el[i] += prop; //go to fuck off
                }
            }
            continue;
        }
        el[i] = prop;
    }
};

var gigi_rootElement = function(el) {
    applyPropsFor(el, el.self.$p, 0); //applies custom properties to node
    return el;
};

var gigi_component = function(obj) {
    var root = obj.root;
    var methods = obj.methods || {};
    var self = {
        is: "gigi-component",
        root: root,
        $p: obj.props
    };
    self.node = gigi_rootElement(root(self));
    
    for(var i in methods) {
        if(i in self) return;
        self[i] = methods[i];
    };
    return self;
};
