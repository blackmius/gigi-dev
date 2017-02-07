gi.route = (function() {
    var routes = {}, notFoundEvts = [];
    var getHash = function(url) {
        var i = url.indexOf("#");
        return i != -1? url.slice(i  + 1): "";
    };
    var getQuery = (s) => { if(s === undefined) return {};
        var a = s.split('&'), q = {};
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            q[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }; return q;
    };
    window.onhashchange = function(e) {
        var old = getHash(e.oldURL),
            _new = getHash(e.newURL).split("?"),
            curr_route = routes[_new[0]];
        if(curr_route) { curr_route(getQuery(_new[1]), old) }
        else { e.hash = getHash(e.newURL); for(var i = 0; i < notFoundEvts.length; i++) notFoundEvts[i](e); }
    };
    var self = function(s, fn) { routes[s] = fn; };
    self.navigate = function(path, params) {
        var s = []
        for(var i in params) if(params.hasOwnProperty(i)) s.push(i + "=" + encodeURIComponent(params[i]))
        document.location.hash = path + (s.length > 0? "?": "") + s.join("&");
    };
    self.notFound = function(evt) { notFoundEvts.push(evt); };
    return self;
})();
