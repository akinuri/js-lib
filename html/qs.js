function qs(query, parent) {
    if (query instanceof HTMLElement) return query;
    if (parent === undefined) {
        parent = document;
    }
    if (typeof parent == "string") {
        parent = qs(parent);
    }
    if (parent === null) {
        return null;
    }
    return parent.querySelector(query);
}

function qsa(query, parent) {
    if (query instanceof HTMLElement) return query;
    if (parent === undefined) {
        parent = document;
    }
    if (typeof parent == "string") {
        parent = qs(parent);
    }
    if (parent === null) {
        return [];
    }
    return Array.from(parent.querySelectorAll(query));
}

function extendHTMLElementWithQS(qsName = "qs", qsaName = "qsa") {
    if (qsName in HTMLElement.prototype == false) {
        HTMLElement.prototype[qsName] = function (query) {
            return qs(query, this);
        };
    }
    if (qsaName in HTMLElement.prototype == false) {
        HTMLElement.prototype[qsaName] = function (query) {
            return qsa(query, this);
        };
    }
}
