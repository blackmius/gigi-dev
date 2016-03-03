var gigi_input = function(props) {
    var input = function() {
        var events = props.events;
        var main = {
            tag: "input",
            attrs: {
                class: "mdl-textfield__input gigi-textfield__input",
                type: props.type || "text",
                value: props.value || "" 
            },
            events: objmerge(events, {
                input: function(e) {
                    props.value = e.target.value;
                    if("input" in events) events.input(e);
                }
            })
        };
        if(props.pattern) main.attrs.pattern = props.pattern;
        return main;
    };
    var label = function() {
        return {
            tag: "label",
            attrs: {
                class: "mdl-textfield__label gigi-textfield__label"
            },
            children: props.label
        }
    };
    var error = function() {
        return {
            tag: "span",
            attrs: {
                class: "mdl-textfield__error"
            },
            children: props.error
        }
    };
    
    var self = gigi_component({
        root: function(self) {
            return {
                self: self,
                tag: "div",
                attrs: {
                    class: "mdl-textfield mdl-js-textfield full-width" + (props.floatingLabel? " mdl-textfield--floating-label": ""),
                },
                children: [
                    input,
                    label,
                    error
                ]
            };
        },
        methods: {
        },
        props: props
    });
    
    return self;
};
