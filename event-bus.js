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
        prependListener()
        bool isOnce = false parameter for new listeners
        dispatch "newListener" and "oldListener" meta events?
    */
    
    addListener(eventName, eventHandler) {
        if (typeof eventHandler !== "function") {
            throw new TypeError("The event handler must be a function");
        }
        if (typeof eventName == "string") {
            let handlers = this.#listeners.get(eventName);
            if (!handlers) {
                handlers = new Set();
                this.#listeners.set(eventName, handlers); 
            }
            handlers.add(eventHandler);
        }
        else if (eventName instanceof Array) {
            for (let event of eventName) {
                this.addListener(event, eventHandler);
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