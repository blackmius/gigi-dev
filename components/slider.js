var gigi_slider = function(props) {
	var slider = {
        tag: "input",
        attrs: {
            class: "mdl-slider mdl-js-slider",
            type: 'range',
            min: String(props.min) || '0',
            style: (props.sliderstyle || {}).slider,
            max: String(props.max) || '100',
            value: String(props.value) || '0',
            tabindex: String(props.tabindex) || '0'
        },
        events: props.events
    };
    
    return gigi_component({
        root: function(self) {
            return {
                self: self,
            	tag: 'div',
            	attrs: {},
            	children: slider
            };
        },
        methods: {
            setValue: function(val) {
                setProp(self, "value", val);
            }
        },
        props: props
    });
};
