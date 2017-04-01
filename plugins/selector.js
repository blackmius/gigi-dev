gi.selector = function(list, selected) {
    var self = {
        selected: selected,
        select: function(name) { self.selected = name },
        get value() { return list[self.selected]; }
    };
    return self;
};
