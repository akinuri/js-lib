function on(elements, events, callback) {
    if (!Array.isArray(elements)) {
        elements = [elements];
    }
    let hasEventCallbackMap = (
        typeof events == "object"
        && !Array.isArray(events)
        && events !== null
        && typeof callback == "undefined"
    );
    if (hasEventCallbackMap) {
        let eventCallbackMap = events;
        events = undefined;
        callback = undefined;
        for (let events in eventCallbackMap) {
            let callback = eventCallbackMap[events];
            if (typeof callback == "function") {
                events = events.split(" ");
                elements.forEach(element => {
                    events.forEach(event => {
                        element.addEventListener(event, function (e) {
                            callback.call(this, e);
                        });
                    });
                });
            }
        }
    }
    else if (callback && typeof callback == "function") {
        if (typeof events == "string") {
            events = events.split(" ");
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

function trigger(element, eventName, isCustomEvent = false, options = {}) {
    let event = isCustomEvent
        ? new CustomEvent(eventName, options)
        : new Event(eventName, options);
    element.dispatchEvent(event);
}

