var gigi_dialog = function(props) {

    var title = function() {
        return {
            tag: "h3",
            attrs: {
                class: "mdl-dialog__title"
            },
            children: props.title || ""
        };
    };
    
    var content = function() {
        return {
            tag: "div",
            attrs: {
                class: "mdl-dialog__content gigi-dialog__content"
            },
            children: props.content
        };
    };
    
    var actions = function() {
        return {
            tag: "div",
            attrs: {
                class: "mdl-dialog__actions" + (props.fullWidthActions? " mdl-dialog__actions--full-width": "")
            },
            children: props.actions
        };
    };
    
    var self = gigi_component({
        root: function(self) {
            console.log(props);
            var dialog = {
                tag: "dialog",
                attrs: {
                    class: "mdl-dialog gigi-dialog fit",
                    style: (props.attrs || {}).style
                },
                children: [
                    title,
                    content,
                    actions
                ]
            };
            
            
            return {
                dialog: dialog,
                self: self,
                tag: "div",
                attrs: {
                    class: "gigi-toplayer " + (props.backdrop? "gigi-backdrop": "fit flexible") + (props.showed? " visible": " invisible"),
                    style: undefined
                },
                events: {
                    click: function(e) {
                        if(e.target == self.node.dom) self.close();
                    }
                },
                children: dialog
            };
        },
        methods: {
            open: function() {
                self.node.dialog.dom.show();
                props.showed = true;
                updateComponent(self);
            },
            close: function() {
                self.node.dialog.dom.close();
                props.showed = false;
                updateComponent(self);
            }
        },
        props: props
    });
    
    return self;
}
