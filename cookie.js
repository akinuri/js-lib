/**
 * Represents a cookie.
 */
class Cookie {
    
    name     = null;
    value    = null;
    
    // how to order the rest?
    // let's follow the Chrome DevTools
    domain   = null;
    path     = null;
    expires  = null;
    maxAge   = null;
    secure   = null;
    samesite = null;
    
    // constructor follows the above/mentioned order
    constructor(name, value, domain, path, expiresOrMaxAge, secure, samesite) {
        this.name   = name   || this.name;
        this.value  = value  || this.value;
        this.domain = domain || this.domain;
        this.path   = path   || this.path;
        if (expiresOrMaxAge) {
            if (typeof expiresOrMaxAge == "number") {
                this.maxAge = expiresOrMaxAge;
            } else {
                this.expires = expiresOrMaxAge;
            }
        }
        this.secure   = secure   || this.secure;
        this.samesite = samesite || this.samesite;
    }
    
    /**
     * Returns a (document.cookie)-ready string representation.
     */
    toString() {
        if (!this.name) {
            return "";
        }
        let pairs = [
            [this.name, (this.value || "")],
        ];
        if (this.domain) {
            pairs.push(["domain", this.domain]);
        }
        if (this.path) {
            pairs.push(["path", this.path]);
        }
        if (this.expires) {
            pairs.push(["expires", this.expires]);
        } else if (this.maxAge != null) {
            pairs.push(["max-age", this.maxAge]);
        }
        if (this.secure) {
            pairs.push(["secure", this.secure]);
        }
        if (this.samesite) {
            pairs.push(["samesite", this.samesite]);
        }
        pairs = pairs.map(pair => {
            return pair.join("=");
        });
        pairs = pairs.join("; ");
        return pairs;
    }
    
}


/**
 * Cookie Manager.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/cookies
 */
let Cookies = {
    
    
    get : function getCookie(name) {
        if (!name) {
            return null;
        }
        let cookiePattern = new RegExp("(?:^| )" + encodeURIComponent(name) + "=([^;]+)");
        var match = document.cookie.match(cookiePattern);
        if (match) {
            return decodeURIComponent(match[1]);
        }
        return null;
    },
    
    
    getAll : function getAllCookies() {
        let table = {};
        let cookies = document.cookie.split(";");
        cookies.forEach(cookie => {
            cookie = cookie.trim().split("=");
            table[cookie[0]] = cookie[1];
        });
        return table;
    },
    
    
    // follows the argument order that's set in Cookie
    set : function setCookie(name, value, domain, path, expiresOrMaxAge, secure, samesite) {
        let cookie = new Cookie(name, value, domain, path, expiresOrMaxAge, secure, samesite);
        document.cookie = cookie.toString();
    },
    
    
    remove : function removeCookie(name, domain, path) {
        let cookie = new Cookie(name);
        cookie.domain = domain || location.host;
        if (path) {
            cookie.path = path;
        } else {
            path = location.pathname.split("/");
            // if the path does not end with a trailing slash
            // the last segment seems to be treated as an item/file, that is, not part of the dir/path
            path.pop();
            path = path.join("/");
            cookie.path = path;
        }
        cookie.maxAge = 0;
        document.cookie = cookie.toString();
    },
    
    
    log : function logCookie(name) {
        if (typeof console.table === "function") {
            // console.table({name : cookies.get(name)});
            console.log(Cookies.get(name));
        }
    },
    
    
    logAll : function logAllCookies() {
        if (typeof console.table === "function") {
            console.table(Cookies.getAll());
        }
    },
    
};