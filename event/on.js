function on(elements, events, callback) {
    if (callback) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }
        if (!Array.isArray(events)) {
            events = [events];
        }
        elements.forEach(element => {
            events.forEach(event => {
                element.addEventListener(event, function (e) {
                    callback.call(this, e);
                });
            });
        });
    }
}

function ondomload(callback) {
    on(window, "DOMContentLoaded", callback);
}

function onwindowload(callback) {
    on(window, "load", callback);
}