gi.app = function(app) {
	var container = app.container || document.body;
	var body = function() { app.body(app.vars); };
	
	var self = {
		update: function() { gi.vdom.update(bodyDom, body); },
		pages: [], page: null, vars: app.vars
	};
	var bodyDom = gi.vdom.append(container, body);
	gi.ready(self.update);
	return self;
};
