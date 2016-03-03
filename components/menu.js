var gigi_menu = function(props) {
    var menu_item = function(text, item) {
        return {
            tag: 'div',
            attrs: {
                style: "display: flex;",
                class: "mdl-menu__item"
            },
            children: {
                tag: "div",
                attrs: {style: "display: flex;"},
                children: [
                    {
                        tag: "div",
                        attrs: {style: "display: flex;"},
                        children: gigi_icon({style: "margin: auto", icon: item.icon}) || {}, 
                    },
                    {
                        tag: "div",
                        children: text
                    }
                ]
            },
            events: item.events
        };
    };

    var self = gigi_component({
        root: function(self) {
            var d = (props.direction || "bottom-left");
            var items = [];
            props.items = props.items || [];
            for (var i in props.items) {       
                var item = props.items[i];
                items.push(menu_item(i, item));
            }
            
            return {
                self: self,
                tag: 'ul',
                attrs: {
                    class: "mdl-menu mdl-menu--" + d + " mdl-js-menu mdl-js-ripple-effect"
                },
                children: items
            }
        },
        props: props
    })
        
    return self;
};
