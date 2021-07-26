
function parse_http_query(query) {
    var result = null;
    if (typeof query == "undefined") {
        query = location.search;
    }
    if (query.startsWith("?")) {
        query = query.slice(1);
    }
    if (query) {
        result = {};
        query.split("&").forEach(pair => {
            [param, value] = pair.split("=");
            result[decodeURIComponent(param)] = decodeURIComponent(value);
        });
    }
    return result;
}




