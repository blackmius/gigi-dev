gi.css = (function() {
    var rules = [];
    var addRule = function(rule) {
        rules.push(gi("style", rule));
        gi.update();
        return rule;
    };
    
    var dom = gi.view({
        container: document.head,
        body: function() {
            return gi([
                gi("!", "gigi.js cssRules start"),
                rules,
                gi("!", "gigi.js cssRules end")
            ])
        }
    });
    dom.init();

    return function(props, rule) {
        var self = {
            enabled: true,
            rule: function() { return self.enabled? rule(props): "" }
        }
        addRule(self.rule)
        return self;
    }
}())

