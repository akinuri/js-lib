/**
 * https://en.wikipedia.org/wiki/Event-driven_architecture#JavaScript
 * https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
 * https://developer.mozilla.org/en-US/docs/Web/API/Event
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback
 * https://nodejs.org/api/events.html#class-eventemitter
 */
class EventBus {
    
    #listeners = new Map();
    
    // TODO: add meta and additional functionalities
    /* 
        prependListener(): listener ordering
        bool isOnce = false: run the handler once and remove it?
        dispatch meta events?
            ListenerAdded
            ListenerRemoved
            EventDispatched
    */
    
    addListener(eventName, eventHandler, isOnce = false) {
        if (typeof eventHandler !== "function") {
            let eventNameString;
            if (typeof eventName == "string") {
                eventNameString = `"${eventName}"`;
            } else if (eventName instanceof Array) {
                eventNameString = "[" + eventName.map(en => `"${en}"`) + "]";
            }
            throw new TypeError(`The event handler (for ${eventNameString}) must be a function.`);
        }
        if (typeof eventName == "string") {
            let handlers = this.#listeners.get(eventName);
            if (!handlers) {
                handlers = new Set();
                this.#listeners.set(eventName, handlers);
            }
            if (isOnce) {
                const onceHandler = (...args) => {
                    this.removeListener(eventName, onceHandler);
                    eventHandler.apply(null, args);
                };
                handlers.add(onceHandler);
            } else {
                handlers.add(eventHandler);
            }
        }
        else if (eventName instanceof Array) {
            for (let event of eventName) {
                this.addListener(event, eventHandler, isOnce);
            }
        }
        return this;
    }
    
    removeListener(eventName, eventHandler) {
        if (!arguments.length) {
            this.#listeners.clear();
        } else if (arguments.length === 1) {
            this.#listeners.delete(eventName);
        } else {
            const handlers = this.#listeners.get(eventName);
            if (handlers) {
                handlers.delete(eventHandler);
            }
        }
        return this;
    }
    
    dispatch(eventName, ...args) {
        const handlers = this.#listeners.get(eventName);
        if (handlers) {
            let e = {name : eventName};
            args.unshift(e);
            for (let handler of handlers) {
                handler.apply(this, args);
            }
        }
        return this;
    }
    
}