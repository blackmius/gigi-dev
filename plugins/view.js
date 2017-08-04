gi.view = function(view) {
	var container = view.container; if(!container) throw Error("App must have a container property")
	var body = view.body,
	    bodyDom,
	    domUpdate = function() { gi.vdom.update(bodyDom, body); console.log("update"); };
	
	var delay = Math.floor(1000 / (view.fps || 45)),
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
