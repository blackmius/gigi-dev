var gigi_dropdownmenu = function(props) {
    var menu = gigi_menu(props).node;
    var num = String(Math.random());
    var self = gigi_component({
        root: function(self) {
            var btn = gigi_button({
                content: gigi_icon({icon: 'more_vert'}).node
            }).node;
            btn.attrs.id = num;
            menu.attrs.for = num;
            var element = {
                self: self,
            	tag: 'div',
            	attrs: {},
            	children: [btn, menu]
            };

            return element;
        },
        methods: {
            
        },
        props: props
    });
    
    return self;
};
