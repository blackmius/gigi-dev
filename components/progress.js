var gigi_progress = function(props) {  
    
    var self = gigi_component({
        root: function(self) {
            var rootclass = "mdl-progress mdl-js-progress";
            rootclass += (props.indeterminate?" mdl-progress__indeterminate": "");
            return {
                self: self,
            	tag: 'div',
            	attrs: {
                    class: rootclass
                }
            };
        },
        methods: {
            setProgress: function(value) {
                self.node.dom.MaterialProgress.setProgress(value)
            },
            setBuffering: function(value) {
                self.node.dom.MaterialProgress.setBuffer(value)
            }
        },
        props: props
    });
    
    return self;
};
