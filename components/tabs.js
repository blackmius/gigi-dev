var gigi_tabs = function(props) {
    var tabs = function() {
        var ret = [];
        var index = 0;
        for(var i in props.panels) {
            var panel = props.panels[i];
            var selectedItem = props.selected || 0;
            var postfix = ((index == selectedItem)? " is-active": "");
            ret.push({
                tag: "a", 
                attrs: {
                    class: "mdl-tabs__tab" + postfix,
                    href: "#" + i
                },
                children: i
            });
            index += 1;
        };
        return ret;
    };
    
    var panels = function() {
        var ret = [];
        var index = 0;
        for(var i in props.panels) {
            var panel = props.panels[i];
            var selectedItem = props.selected || 0;
            var postfix = ((index == selectedItem)? " is-active": "");
            ret.push({
                tag: "div",
                attrs: {
                    class: "mdl-tabs__panel" + postfix,
                    id: i
                },
                children: {
                    tag: "div",
                    attrs: {class: "flexible"},
                    children: panel
                }
            });
            index += 1;
        };
        return {children: ret};
    };

    var bar = function() {
        return {
            tag: "div",
            attrs: {
                class: "mdl-tabs__tab-bar"
            },
            children: tabs
        }
    };
    
    var self = gigi_component({
        root: function(self) {
            return {
                self: self,
                tag: "div",
                attrs: {
                    class: "mdl-tabs mdl-js-tabs" + (props.ripple? "mdl-js-ripple-effect": "")
                },
                children: [
                    bar,
                    panels
                ]
            }  
        },
        props: props
    });
    
    
    
    return self;
};
