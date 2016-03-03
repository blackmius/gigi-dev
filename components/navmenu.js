
var gigi_navmenu = function(props) {
    var a = function(item) {
        return {
            tag: 'div',
            attrs: {class: "gigi-navmenu__item"}, 
            children: {
                tag: "div",
                attrs: {},
                children: item
            }
        };
    };
    
    var nav = function(items) {
        var menu = [];

        for (var i = 0; i<items.length; i++){
            menu.push(a(items[i]));
        }

        return {
            tag: 'div',
            attrs: {class: "mdl-navigation mdl-layout--large-screen-only"}, 
            children: menu
        };
    };
    
    var title = function(text) {
        return {
            tag: 'span',
            attrs: {class: "mdl-layout-title"},
            children: text
        };
    };

    var drawer = function() {
        var items = props.content || [];
        return {
            tag: 'div',
            attrs: {class: 'mdl-layout__drawer' +  (props.visible? " is-visible": "")},
            children: [title(props.title), nav(items)]
        };
    };
    
    var self = gigi_component({
        root: function(self) {
            var backdrop = {
                tag: 'div',
                attrs: {
                    class: "fit gigi-backdrop " + (props.visible? "visible": "invisible"),
                    style: "transition: all 0.2s;"
                },
                events: {
                    click: function() {
                        self.hide();
                    }
                },
                
            };
            return {
                self: self,
                tag: "div",
                attrs: {
                    class: "flexible",
                    style: {
                        "z-index": "1"
                    }
                },
                children: [
                    backdrop,
                    drawer
                ]
            }
        },
        methods: {
            hide: function() {
                self.$p.visible = false;
                updateComponent(self);
            },
            show: function() {
                self.$p.visible = true;
                updateComponent(self);
            },
            toggle: function() {
                self.$p.visible = !self.$p.visible;
                updateComponent(self);
            }
        },
        props: props
    });
    
    return self;
};
