var gigi_list = function(props) {  

    var list_item = function(item) {
        var prefix = gigi_icon({icon: props.prefixicon});

        return {
            tag: 'div',
            attrs: {class:"gigi-list__item"},
            children: {
                children: item
            }
        };
    };

    var items = function() {
        var ret = [];
        console.log("____", props);
        for(var i = 0; i < props.items.length; i++) {       
            var item = props.items[i];
            ret.push(list_item(item));
        };    

        return ret;
    };

    var self = gigi_component({
        root: function(self) {
            return {
                self: self,
                tag: 'div',
                attrs: {
                    class: "gigi-list",
                },
                children: items
            };
        },
        methods: {
            push: function(item) {
                props.items.push(item);
                updateComponent(self);
            },
            unshift: function(item) {
                props.items.unshift(item);
                updateComponent(self);
            },
            splice: function(i, w) {
                props.items.splice(i, w);
                updateComponent(self);
            },
            remove: function(i) {
                self.splice(i, 1);
            },
            pop: function(i) {
                var el = props.items.pop(i);
                updateComponent(self);
                return el;
            }
        },
        props: props
    });

    return self;
};
