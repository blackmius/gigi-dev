var gigi_snackbar = function(props) {
    var text = function() {
        return {
            tag: 'div',
            attrs: {class: "mdl-snackbar__text"},
        }
    }
    var btn = function() {
        return {
            tag: 'button',
            attrs: {class: "mdl-snackbar__action"}
        }
    }
    var self = gigi_component({
        root: function(self) {
            var classprop = "mdl-js-snackbar mdl-snackbar";
            return {
                self: self,
                tag: "div",
                attrs: {
                    class: classprop
                },
                children: [text, btn]
            };
        },
        methods: {
            show: function(data) {
                self.node.dom.MaterialSnackbar.showSnackbar(data);
            }
        },
        props: props
    });
    
    return self;
};
