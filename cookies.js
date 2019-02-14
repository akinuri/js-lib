var cookies = {
    get : function getCookie(name) {
        var match = document.cookie.match(new RegExp("(?:^| )" + encodeURIComponent(name) + "=([^;]+)"));
        if (match) {
            return decodeURIComponent(match[1]);
        }
    },
    getAll : function getAllCookies() {
        var table = {};
        var cookies = document.cookie.split(";");
        cookies.forEach(function (cookie) {
            var cookie = cookie.trim().split("=");
            table[cookie[0]] = cookie[1];
        });
        return table;
    },
    set : function setCookie(name, value, maxAge, path, domain) {
        var pairs = [];
        pairs.push( encodeURIComponent(name) + "=" + encodeURIComponent(value) );
        if (maxAge) {
            if (typeof maxAge == "number")
                pairs.push( "max-age=" + maxAge );
            else
                pairs.push( "expires=" + maxAge );
        }
        if (path)
            pairs.push( "path=" + path );
        if (domain)
            pairs.push( "domain=" + domain );
        document.cookie = pairs.join("; ");
    },
    del : function deleteCookie(name) {
        cookies.set(name, "", "Thu, 01 Jan 1970 00:00:00 GMT");
    },
    log : function logCookie(name) {
        if (typeof console.table === "function") {
            console.table({name : cookies.get(name)});
        }
    },
    logAll : function logAllCookies() {
        if (typeof console.table === "function") {
            console.table(cookies.getAll());
        }
    },
};