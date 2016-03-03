var gigi_tooltip = function(props) {
    var num = String(Math.random());
    var self = gigi_component({
        root: function(self) {
            var rootclass = 'mdl-tooltip'
            rootclass += (props.large?' mdl-tooltip--large': '')
            rootclass += ('position' in props?' mdl-tooltip--'+props.position:'')
            props.content.attrs = props.content.attrs || {};
            props.content.attrs.id = num;
            var element = {
                self: self,
            	tag: 'div',
            	attrs: {class: rootclass, for: num},
            	children: props.description
            };

            return element;
        },
        methods: {
            
        },
        props: props
    });
    
    return self;
};
