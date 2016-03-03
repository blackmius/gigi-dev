var welcome_page = function(props) {
    var main_dialog = login_dialog();
    
    return gigi_component({
        root: function(self) {
            return {
                self: self,
                tag: "div",
                attrs: {
                    class: "flexible fit"
                },
                children: main_dialog.node
            };
        },
        methods: {
            openLoginDialog: function() {
                main_dialog.open();
            }
        },
        props: props
    });
}
