function removeURLSearchParameters(url) {
    let isObj = url instanceof URL;
    if (!isObj) {
        url = new URL(url);
    }
    let _url = url.origin + url.pathname;
    if (isObj) {
        return new URL(_url);
    }
    return _url;
}

function setURLSearchParameters(url, parameters) {
    let isObj = url instanceof URL;
    if (!isObj) {
        url = new URL(url);
    }
    for (const key in parameters) {
        const value = parameters[key];
        url.searchParams.set(key, value);
    }
    if (isObj) {
        return url;
    }
    return url.toString();
}

function addURLSearchParameters(url, parameters) {
    let isObj = url instanceof URL;
    if (!isObj) {
        url = new URL(url);
    }
    for (const key in parameters) {
        const value = parameters[key];
        url.searchParams.append(key, value);
    }
    if (isObj) {
        return url;
    }
    return url.toString();
}