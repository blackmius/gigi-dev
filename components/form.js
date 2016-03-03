var gigi_form = function(props) {
    props.data = props.data || {};
    var updValues = function(e, label) {
        props.data[label] = e.target.value;
        update();
    };

    var input = function(label, value, i) {
        return gigi_input({
            label: label,
            floatingLabel: true,
            events: {
                input: function(e) {
                    updValues(e, i);
                }
            },
            value: value
        }).node;
    };

    var form = function() {
        var inputs = [];
        var fields = props.fields || {};
        var data = props.data || {};

        for (var i in fields) {
            var label = fields[i];
            inputs.push(input(label, data[i], i));
        }
        return {
            children: inputs
        };
    }

    var update = function() {
        if (!props.onupdate) return;
        props.onupdate();
    };

    var self = gigi_component({
        root: function(self) {
            return {
                self: self,
                tag: "div",
                children: form
            };
        },
        props: props
    })

    return self;
}