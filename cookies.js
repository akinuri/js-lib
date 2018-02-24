var cookies = {
    getAll : function getAllCookies() {
        var table = {};
        var cookies = document.cookie.split(";");
        cookies.forEach(function (cookie) {
            var cookie = cookie.split("=");
            var name   = cookie[0].trim();
            var value  = cookie[1].trim();
            table[name] = value;
        });
        return table;
    },
    get : function getCookie(name) {
        return unescape(cookies.getAll()[name]);
    },
    set : function setCookie(name, value, expires, path, domain, secure) {
        var pairs = [];
        pairs.push( name + "=" + escape(value) );
        if (expires) {
            if (typeof expires == "number")
                pairs.push( "max-age=" + expires );
            else
                pairs.push( "expires=" + expires );
        }
        if (path)
            pairs.push( "path=" + path );
        if (domain)
            pairs.push( "domain=" + domain );
        document.cookie = pairs.join("; ");
    },
    del : function deleteCookie(name) {
        cookies.set(name, "", (new Date(0)).toUTCString());
    },
    log : function logAllCookies() {
        if (typeof console.table === "function") {
            console.table(cookies.getAll());
        }
    },
};