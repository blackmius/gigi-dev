var gigi_card = function(props) {
    
    var title = function() {
        return {
            tag: 'div',
            attrs: {class: 'mdl-card__title', style: props.style.title || {}},
            children: {
                tag: 'h2', 
                attrs: {class: "mdl-card__title-text"},
                children: props.title
            }
        };
    };

    var description = function() {
        return {
            tag: "div",
            attrs: {class: "mdl-card__supporting-text", style: props.style.description || {}},
            children: props.description
        };
    };

    var bottom = function() {
        return {
            tag: 'div',
            attrs: {class: "mdl-card__actions mdl-card--border", style: props.style.bottom},
            children: props.bottom
        };
    };

    var cardmenu = function() {
        return {
            tag: 'div',
            attrs: {class: "mdl-card__menu"},
            children: props.menu
        };
    };

    
    var self = gigi_component({
        root: function(self) {
            props.style = props.style || {};
            var rootclass = "mdl-card gigi-card";
            rootclass += ' mdl-shadow--'+ (props.shadowheight || 1) + 'dp';
            return {
                self: self,
            	tag: 'div',
            	attrs: {
                    style: props.style.main,
                    class: rootclass
                },
                children: [
                    title,
                    description,
                    bottom,
                    cardmenu
                ]
            };
        },
        methods: {
        },
        props: props
    });
    
    return self;
};
