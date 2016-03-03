var gigi_badge = function(props) {  
    
    
    var self = gigi_component({
        root: function(self) {
            var rootclass = "mdl-badge";
            rootclass += (props.icon?' material-icons': "");
            rootclass += (props.overlap?' mdl-badge--overlap': "");
            return {
                self: self,
                tag: 'table',
                attrs: {
                    class: rootclass,
                    'data-badge': props.value
                },
                children: props.content
            };
        },
        methods: {
        },
        props: props
    });
    
    return self;
};
