gi.app = function(app) {
	var container = app.container || document.body;
	var body = function() { return app.body(app.vars); };
	var bodyDom;
	var self = {
		update: function() { gi.vdom.update(bodyDom, body); },
		pages: [], page: null, vars: app.vars,
		init: function() {
	        bodyDom = gi.vdom.append(container, body);
	        gi.ready(self.update);
        }
	};
	return self;
};
