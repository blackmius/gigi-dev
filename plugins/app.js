gi.app = function(name) {
	var map = function(el, fn) { var ret = []; for(var i = 0; i < el.length; i++) ret[i] = fn(el[i]); return ret; }
	var body = function() {
		return gi("." + self.name + "-pages",
			map(self.pages, function(page) {
				return gi("." + self.name + "-page", page.name == self.page? page.content: "");
			})
		);
	};
	
	var self = {
		update: function() { gi.vdom.update(bodyDom, body); }, name: name || "app",
		pages: [], page: null, state: {/* GLOBAL VARIABLES HERE */}, pageClass: "app-page",
		addPage: function(name, pg) { self.pages.push({name: name, content: pg}); },
		showPage: function(name) { self.page = name; self.update(); }, content: body
	};
	var bodyDom = gi.vdom.append(document.body, body);
	gi.ready(self.update);
	return self;
};
