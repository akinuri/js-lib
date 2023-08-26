/*
In order to log the all event listeners in a page, we need to hijack the native
event listener function: EventTarget.addEventListener. And if we want to remove
these events we also need to hijack the EventTarget.removeEventListener function.
This "hijacking" code needs to run before any event listener is added.
We need three things:
 * a container to store event listeners
 * an object to represent an event listener
 * the hijacking
*/


// #region ==================== LISTENER CONTAINER

var EventListeners = {
    listeners : [],
    add : function adEventListenerToList(listener) {
        EventListeners.listeners.push(listener);
    },
    remove : function removeEventListenerFromList(targetListener) {
        for (let i = 0; i < EventListeners.listeners.length; i++) {
            let listener = EventListeners.listeners[i];
            if (
                listener.target == targetListener.target
                && listener.type == targetListener.type
                && listener.callback == targetListener.callback
            ) {
                EventListeners.listeners.splice(i, 1);
                break;
            }
        }
    },
    get : function getEventListeners(elementOrEventName) {
        let result = [];
        for (let listener of EventListeners.listeners) {
            switch (typeof elementOrEventName) {
                case "object":
                    if (listener.target == elementOrEventName) {
                        result.push(listener);
                    }
                    break;
                case "string":
                    if (listener.type == elementOrEventName) {
                        result.push(listener);
                    }
                    break;
            }
        }
        return result;
    },
};

//#endregion


// #region ==================== EVENT LISTENER

/**
 * Represents the element and the arguments passed to addEventListener()
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
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
    let args = [this.type, this.callback];
    if (this.options) {
        args.push(this.options);
    }
    else if (this.useCapture != null) {
        args.push(this.useCapture);
        if (this.wantsUntrusted != null) {
            args.push(this.wantsUntrusted);
        }
    }
    this.target.removeEventListener(...args);
};

//#endregion


// #region ==================== NATIVE API HIJACK

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
EventTarget.prototype.addEventListener = function (nativeEventListenerAdder) {
    console.info("[Info] EventTarget.prototype.addEventListener() has been modified.");
    return function () {
        let listener = null;
        switch (arguments.length) {
            // EventTarget.addEventListener(type, callback)
            case 2:
                listener = new EventListener(this, arguments[0], arguments[1]);
                nativeEventListenerAdder.call(
                    listener.target,
                    listener.type,
                    listener.callback,
                );
                break;
            // EventTarget.addEventListener(type, callback, options)
            // EventTarget.addEventListener(type, callback, useCapture)
            case 3:
                listener = new EventListener(this, arguments[0], arguments[1]);
                let thirdArgType = typeof arguments[2];
                if (
                    thirdArgType == "object"
                    && (   "capture" in arguments[2]
                        || "once"    in arguments[2]
                        || "passive" in arguments[2]
                        || "signal"  in arguments[2] )
                ) {
                    listener.options = arguments[2];
                    nativeEventListenerAdder.call(
                        listener.target,
                        listener.type,
                        listener.callback,
                        listener.options,
                    );
                }
                else if (["boolean", "undefined", "object"].includes(thirdArgType)) {
                    listener.useCapture = !!arguments[2];
                    nativeEventListenerAdder.call(
                        listener.target,
                        listener.type,
                        listener.callback,
                        listener.useCapture,
                    );
                }
                break;
            // EventTarget.addEventListener(type, callback, useCapture, wantsUntrusted)
            case 4:
                listener = new EventListener(this, arguments[0], arguments[1]);
                if (typeof arguments[2] == "boolean") {
                    listener.useCapture     = arguments[2];
                    listener.wantsUntrusted = arguments[3];
                    nativeEventListenerAdder.call(
                        listener.target,
                        listener.type,
                        listener.callback,
                        listener.useCapture,
                        listener.wantsUntrusted,
                    );
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
                nativeEventListenerRemover.call(
                    listener.target,
                    listener.type,
                    listener.callback,
                );
                break;
            case 3:
                listener = new EventListener(this, arguments[0], arguments[1]);
                switch (typeof arguments[2]) {
                    case "object":
                        listener.options = arguments[2];
                        nativeEventListenerRemover.call(
                            listener.target,
                            listener.type,
                            listener.callback,
                            listener.options,
                        );
                        break;
                    case "boolean":
                        listener.useCapture = arguments[2];
                        nativeEventListenerRemover.call(
                            listener.target,
                            listener.type,
                            listener.callback,
                            listener.useCapture,
                        );
                        break;
                }
                break;
        }
        if (listener) EventListeners.remove(listener);
    }
}(EventTarget.prototype.removeEventListener);

//#endregion

