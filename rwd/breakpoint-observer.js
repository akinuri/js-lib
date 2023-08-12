class BreakpointObserver {
    
    breakpoints     = {};
    callbacks       = {};
    throttleDelay   = 200;
    change          = [];
    
    constructor(breakpoints) {
        breakpoints = Object.entries(breakpoints);
        breakpoints.sort((a, b) => a[1] - b[1]);
        breakpoints = Object.fromEntries(breakpoints);
        this.breakpoints = breakpoints;
    }
    
    on(callbacks) {
        for (const bpName in callbacks) {
            if (Object.hasOwnProperty.call(callbacks, bpName)) {
                const callback = callbacks[bpName];
                if (bpName in this.breakpoints) {
                    if (typeof this.callbacks[bpName] == "undefined") {
                        this.callbacks[bpName] = [];
                    }
                    this.callbacks[bpName].push(callback);
                }
            }
        }
    }
    
    getCurrentBreakpoint() {
        let breakpoint = null;
        let breakpoints = Object.entries(this.breakpoints);
        for (const breakpointEntry of breakpoints) {
            let [bpName, bpWidth] = breakpointEntry;
            if (innerWidth >= bpWidth) {
                breakpoint = bpName;
            } else {
                break;
            }
        }
        return breakpoint;
    }
    
    detectBreakpointChange() {
        let previous = this.change[1] || this.change[0] || null;
        let current = this.getCurrentBreakpoint();
        let breakpoint = null;
        if (previous != current) {
            breakpoint = current;
        }
        return breakpoint;
    }
    
    check() {
        let newBreakpoint = this.detectBreakpointChange();
        if (newBreakpoint) {
            this.callCallbacks(newBreakpoint);
            this.change.push(newBreakpoint);
            if (this.change.length > 2) {
                this.change.shift();
            }
        }
    }
    
    callCallbacks(breakpoint) {
        this.callbacks[breakpoint].forEach(callback => callback());
    };
    
    observe() {
        window.addEventListener("DOMContentLoaded", this.check.bind(this));
        window.addEventListener("load", this.check.bind(this));
        window.addEventListener(
            "resize",
            throttle(this.check.bind(this), this.throttleDelay),
        );
    }
    
}

function throttle(callback, delay = 1000) {
    var timeoutHandle = null;
    let throttleInner = function throttleInner() {
        let passedArgs = Array.from(arguments);
        if (timeoutHandle == null) {
            timeoutHandle = setTimeout(function () {
                callback.apply(this, passedArgs);
                timeoutHandle = null;
            }.bind(this), delay || 1000);
        }
    };
    if (!(this instanceof Window)) {
        throttleInner = throttleInner.bind(this);
    }
    return throttleInner;
}

