gi.selector = function(list, _selected) {
    var self = {
        select: function(name) { _selected = name },
        get value() { return list[_selected]; }
    };
    return self;
};
