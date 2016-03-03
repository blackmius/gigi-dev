var gigi_spinner = function(props) {  
    
    var self = gigi_component({
        root: function(self) {
            var rootclass = "mdl-spinner mdl-js-spinner is-active";
            rootclass += (props.single_color?' mdl-spinner--single-color': "");
            return {
                self: self,
            	tag: 'div',
            	attrs: {
                    class: rootclass
                }
            };
        },
        methods: {
            start: function() {
                self.node.dom.MaterialSpinner.start()
            },
            stop: function() {
                self.node.dom.MaterialSpinner.stop()
            }
        },
        props: props
    });
    
    return self;
};
