// #region ==================== GLOBAL LISTENER CONTAINER

var EventListeners = {
    listeners : [],
    forEach : function loopEventListeners(callback) {
        for (let i = 0; i < EventListeners.listeners.length; i++) {
            let listener = EventListeners.listeners[i];
            callback(listener, i);
        }
    },
    get : function getEventListeners(selector) {
        let result = [];
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
    remove : function removeEventListener(targetListener) {
        EventListeners.forEach(function (listener, index) {
            if (targetListener.target == listener.target && targetListener.type == listener.type && targetListener.callback == listener.callback) {
                EventListeners.listeners.splice(index, 1);
            }
        });
    },
    
};

//#endregion


// #region ==================== EVENT LISTENER OBJECT

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
            if (typeof arguments[3] == "boolean") {
                this.useCapture     = arguments[3];
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

//#endregion


// #region ==================== NATIVE API

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
EventTarget.prototype.addEventListener = function (nativeEventListenerAdder) {
    console.info("[Info] EventTarget.prototype.addEventListener() has been modified.");
    return function () {
        let listener = null;
        switch (arguments.length) {
            // EventTarget.addEventListener(type, callback)
            case 2:
                listener = new EventListener(this, arguments[0], arguments[1]);
                nativeEventListenerAdder.call(listener.target, listener.type, listener.callback);
                break;
            // EventTarget.addEventListener(type, callback, options)
            // EventTarget.addEventListener(type, callback, useCapture)
            case 3:
                listener = new EventListener(this, arguments[0], arguments[1]);
                switch (typeof arguments[2]) {
                    case "object":
                        listener.options = arguments[2];
                        nativeEventListenerAdder.call(listener.target, listener.type, listener.callback, listener.options);
                        break;
                    case "boolean":
                        listener.useCapture = arguments[2];
                        nativeEventListenerAdder.call(listener.target, listener.type, listener.callback, listener.useCapture);
                        break;
                }
                break;
            // EventTarget.addEventListener(type, callback, useCapture, wantsUntrusted)
            case 4:
                listener = new EventListener(this, arguments[0], arguments[1]);
                if (typeof arguments[2] == "boolean") {
                    listener.useCapture     = arguments[2];
                    listener.wantsUntrusted = arguments[3];
                    nativeEventListenerAdder.call(listener.target, listener.type, listener.callback, listener.useCapture, listener.wantsUntrusted);
                }
                break;
        }
        if (listener) EventListeners.add(listener);
        return listener;
    }
}(EventTarget.prototype.addEventListener);

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
EventTarget.prototype.removeEventListener = function (nativeEventListenerRemover) {
    console.info("[Info] EventTarget.prototype.removeEventListener() has been modified.");
    return function () {
        let listener = null;
        switch (arguments.length) {
            case 2:
                listener = new EventListener(this, arguments[0], arguments[1]);
                nativeEventListenerRemover.call(listener.target, listener.type, listener.callback);
                break;
            case 3:
                listener = new EventListener(this, arguments[0], arguments[1]);
                switch (typeof arguments[2]) {
                    case "object":
                        listener.options = arguments[2];
                        nativeEventListenerRemover.call(listener.target, listener.type, listener.callback, listener.options);
                        break;
                    case "boolean":
                        listener.useCapture = arguments[2];
                        nativeEventListenerRemover.call(listener.target, listener.type, listener.callback, listener.useCapture);
                        break;
                }
                break;
        }
        if (listener) EventListeners.remove(listener);
    }
}(EventTarget.prototype.removeEventListener);

//#endregion