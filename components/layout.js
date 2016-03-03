var gigi_layout = function(props) {
    
    var spacer = function() {
        return {
            tag: 'div',
            attrs: {class: "mdl-layout-spacer"}
        };
    };

    var title = function() {
        return {
            tag: 'div',
            attrs: {class: "mdl-layout-title"},
            children: props.title
        };
    };
    var a = function(item) {
        return {
            tag: 'a',
            attrs: {class: "mdl-navigation__link"},
            children: item
        }
    }

    var nav = function() {
        var items = []

        if ('toolbar' in props) {
            for (var i = 0; i<props.toolbar.length; i++) {
                items.push(a(props.toolbar[i]))
            }
        }
        return {
            tag: 'nav',
            attrs: {class: 'mdl-navigation'},
            children: items
        }
    }
    
    var content = function() {
        return {
            tag: "div",
            attrs: {
                class: "flexible full-width",
                style: {flex: "1", display: "flex", overflow: "auto", "z-index": 0, "position": "static"}
            },
            children: props.content
        };
    };
    
    var row = function() {
        var navmenuBtn = gigi_button({
            content: gigi_icon({icon: ''}).node, 
            events: {
                click: function(e){
                    self.openNavMenu();
                    if(props.onMenuBtnClick) props.onMenuBtnClick();
                }
            },
            attrs: {}
        }).node
        return {
            tag: 'div',
            attrs: {class: "mdl-layout__header-row gigi-layout__header-row"},
            children: [navmenuBtn, title, spacer, nav]
        }
    }
    var header = function() {
        return {
            tag: 'header',
            attrs: {class: 'mdl-layout__header'},
            children: row
        }
    }
    var self = gigi_component({
        root: function(self) {
            var classprop = "mdl-layout mdl-js-layout";
            var navmenu = (props.navmenu || {}).node || {tag: "div", self: {}}//gigi_navmenu({title: 'default', content: ["Hello", "world"]});
            return {
                self: self,
                tag: "div",
                attrs: {
                    class: classprop
                },
                navmenu: navmenu.self,
                children: [header, content, navmenu]
            };
        },
        methods: {
            openNavMenu: function() {
                if(!self.node.navmenu.show) return;
                
                self.node.navmenu.show()
            }
        },
        props: props
    });
    
    return self;
};
