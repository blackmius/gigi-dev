var gigi_icon = function(props) {
    props.style = props.style || {};
    props.style.cursor = "pointer";
    
    var self = gigi_component({
        root: function(self) {
            return {
                self: self,
                tag: 'i',
                attrs: {class: "material-icons"},
                children: props.icon    
            };
        },
        props: props
    });
    
    return self;
}
