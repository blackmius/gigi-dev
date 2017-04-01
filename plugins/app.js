gi.app = function(app) {
	var container = app.container; if(!container) throw Error("App must have a container property")
	var body = app.body,
	    bodyDom,
	    domUpdate = function() { gi.vdom.update(bodyDom, body); console.log("update"); };
	
	var delay = Math.floor(1000 / (app.fps || 45)),
	    updateNeeded = false,
	    updated = false;
	var loop = function() {
    	if(updateNeeded && !updated) {
    	    updateNeeded = false; updated = true;
    	    domUpdate();
    	}
    	else updated = false;
    	
	    setTimeout(loop, delay);
	};
	
	var self = {
		update: function() {
		    if(!updated) { updated = true; domUpdate(); }
		    else { updateNeeded = true; }
	    },
		init: function() {
	        bodyDom = gi.vdom.append(container, body); loop();
	        gi.addUpdateHandler(self.update);
        }
	};
	return self;
};
