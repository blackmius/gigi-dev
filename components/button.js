var gigi_button = function(props) {
    var self = gigi_component({
        root: function(self) {
            var classprop = "mdl-button mdl-js-button";
            classprop += (props.ripple?" mdl-js-ripple-effect": "");
            classprop += (props.raised?" mdl-button--raised": "");
            classprop += (props.fab?" mdl-button--fab": "");
            classprop += (props.mini_fab?" mdl-button--mini-fab": "");
            classprop += (props.isicon?" mdl-button--icon": "");
            classprop += (props.colored?" mdl-button--colored": "");
            classprop += (props.primary?" mdl-button--primary": "");
            classprop += (props.accent?" mdl-button--accent": "");
            classprop += (props.shadowed?" gigi-button--shadowed": "");
            var element = {
                self: self,
                tag: "button",
                attrs: {
                    class: classprop
                },
                children: props.content
            };
            
            if(props.disabled) {
                element.attrs.disabled = "true";
            } else if("disabled" in element.attrs) {
                delete element.attrs.disabled;
            };
            
            return element;
        },
        methods: {
        },
        props: props
    });
    
    return self;
};
