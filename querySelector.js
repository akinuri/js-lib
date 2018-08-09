function qs() {
    var parent   = null;
    var selector = null;
    switch (arguments.length) {
        case 1:
            parent = document;
            selector = arguments[0];
            break;
        case 2:
            parent = arguments[0];
            selector = arguments[1];
            break;
    }
    return parent.querySelector(selector);
}

function qsa() {
    var parent   = null;
    var selector = null;
    switch (arguments.length) {
        case 1:
            parent = document;
            selector = arguments[0];
            break;
        case 2:
            parent = arguments[0];
            selector = arguments[1];
            break;
    }
    return Array.from(parent.querySelectorAll(selector));
}