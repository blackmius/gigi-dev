gi.selector = function(list) {
    var self = function() { return list[self.selected]; };
    self.selected = 0;
    self.select = function(p) { self.selected = p; };
    return self;
};
