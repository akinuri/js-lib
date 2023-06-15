function qs(query, parent) {
    if (query instanceof HTMLElement) return query;
    if (parent === null) {
        return null;
    }
    if (parent === undefined) {
        parent = document;
    }
    return parent.querySelector(query);
}

function qsa(query, parent) {
    if (query instanceof HTMLElement) return query;
    if (parent === null) {
        return [];
    }
    if (parent === undefined) {
        parent = document;
    }
    return Array.from(parent.querySelectorAll(query));
}