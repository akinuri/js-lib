// ================================================== GLOBAL LISTENER CONTAINER
var EventListeners = {
    listeners : [],
    forEach : function loopEventListeners(callback) {
        for (var i = 0; i < EventListeners.listeners.length; i++) {
            var listener = EventListeners.listeners[i];
            callback(listener, i);
        }
    },
    get : function getEventListeners(selector) {
        var result = [];
        EventListeners.forEach(function (listener) {
            switch (typeof selector) {
                case "object":
                    if (listener.target == selector) {
                        result.push(listener);
                    }
                    break;
                case "string":
                    if (listener.type == selector) {
                        result.push(listener);
                    }
                    break;
            }
        });
        return result;
    },
    add : function logEventListener(listener) {
        EventListeners.listeners.push(listener);
    },
    remove : function removeEventListener(victimListener) {
        EventListeners.forEach(function (listener, index) {
            if (victimListener.target == listener.target && victimListener.type == listener.type && victimListener.callback == listener.callback) {
                EventListeners.listeners.splice(index, 1);
            }
        });
    },
};


// ================================================== EVENT LISTENER OBJECT
function EventListener() {
    this.target         = null;
    this.type           = null;
    this.callback       = null;
    this.options        = null;
    this.useCapture     = null;
    this.wantsUntrusted = null;
    this.parseArgs.apply(this, Array.from(arguments));
}

EventListener.prototype.parseArgs = function parseArgs(target, type, callback) {
    if (arguments.length < 3) {
        return;
    }
    this.target   = target;
    this.type     = type;
    this.callback = callback;
    switch (arguments.length) {
        case 4:
            switch (typeof arguments[3]) {
                case "object":
                    this.options = arguments[3];
                    break;
                case "boolean":
                    this.useCapture = arguments[3];
                    break;
            }
            break;
        case 5:
            if (typeof args[3] == "boolean") {
                this.useCapture = arguments[3];
                this.wantsUntrusted = arguments[4];
            }
            break;
    }
};

EventListener.prototype.remove = function removeEventListener() {
    if (this.options) {
        this.target.removeEventListener(this.type, this.callback, this.options);
        EventListeners.remove(this);
    } else if (this.useCapture != null) {
        if (this.wantsUntrusted != null) {
            this.target.removeEventListener(this.type, this.callback, this.useCapture, this.wantsUntrusted);
            EventListeners.remove(this);
        } else {
            this.target.removeEventListener(this.type, this.callback, this.useCapture);
            EventListeners.remove(this);
        }
    } else {
        this.target.removeEventListener(this.type, this.callback);
        EventListeners.remove(this);
    }
};

// ================================================== NATIVE API

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
EventTarget.prototype.addEventListener = function (addEventListener) {
    console.warn("EventTarget.prototype.addEventListener() has been modified.");
    return function () {
        var evtList = null;
        switch (arguments.length) {
            // EventTarget.addEventListener(type, callback)
            case 2:
                evtList = new EventListener(this, arguments[0], arguments[1]);
                addEventListener.call(evtList.target, evtList.type, evtList.callback);
                console.log(callback);
                EventListeners.add(evtList);
                return evtList;
            // EventTarget.addEventListener(type, callback, options)
            // EventTarget.addEventListener(type, callback, useCapture)
            case 3:
                evtList = new EventListener(this, arguments[0], arguments[1]);
                switch (typeof arguments[2]) {
                    case "object":
                        evtList.options = arguments[2];
                        addEventListener.call(evtList.target, evtList.type, evtList.callback, evtList.options);
                        EventListeners.add(evtList);
                        return evtList;
                    case "boolean":
                        evtList.useCapture = arguments[2];
                        addEventListener.call(evtList.target, evtList.type, evtList.callback, evtList.useCapture);
                        EventListeners.add(evtList);
                        return evtList;
                }
                break;
            // EventTarget.addEventListener(type, callback, useCapture, wantsUntrusted)
            case 4:
                evtList = new EventListener(this, arguments[0], arguments[1]);
                if (typeof arguments[2] == "boolean") {
                    evtList.useCapture     = arguments[2];
                    evtList.wantsUntrusted = arguments[3];
                    addEventListener.call(evtList.target, evtList.type, evtList.callback, evtList.useCapture, evtList.wantsUntrusted);
                    EventListeners.add(evtList);
                    return evtList;
                }
                break;
        }
    }
}(EventTarget.prototype.addEventListener);

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
EventTarget.prototype.removeEventListener = function (removeEventListener) {
    console.warn("EventTarget.prototype.removeEventListener() has been modified.");
    return function () {
        var evtList = null;
        switch (arguments.length) {
            case 2:
                evtList = new EventListener(this, arguments[0], arguments[1]);
                removeEventListener.call(evtList.target, evtList.type, evtList.callback);
                EventListeners.remove(evtList);
                break;
            case 3:
                evtList = new EventListener(this, arguments[0], arguments[1]);
                switch (typeof arguments[2]) {
                    case "object":
                        evtList.options = arguments[2];
                        removeEventListener.call(evtList.target, evtList.type, evtList.callback, evtList.options);
                        EventListeners.remove(evtList);
                        break;
                    case "boolean":
                        evtList.useCapture = arguments[2];
                        removeEventListener.call(evtList.target, evtList.type, evtList.callback, evtList.useCapture);
                        EventListeners.remove(evtList);
                        break;
                }
                break;
        }
    }
}(EventTarget.prototype.removeEventListener);