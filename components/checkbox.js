var gigi_checkbox = function(props) {
    var type = props.type || "checkbox";
	var checkbox = {
        tag: "input",
        attrs: {
            class: (type != 'radio')? "mdl-" + type + "__input": "mdl-" + type + "__button",
            type: 'checkbox',
        },
        events: props.events
    };
    var labelclass = "mdl-" + type + " mdl-js-" + type ;
    labelclass += (props.ripple?" mdl-js-ripple-effect": "");
    
    var span = function() {
        return {
            tag: 'span',
            attrs: {class: "mdl-" + type + "__label"},
            children: props.content
        };
    };
    
    var label = function() {
        return {
            tag: 'label',
            attrs: {class: labelclass},
            children: [checkbox, span]
        };
    };
    
    var self = gigi_component({
        root: function(self) {
            return {
                self: self,
            	tag: 'div',
            	attrs: {},
            	children: label
            };
        }
    });
    
    return self;
};
