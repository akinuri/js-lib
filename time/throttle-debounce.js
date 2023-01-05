// https://stackoverflow.com/questions/27078285/simple-throttle-in-js/51493084#51493084

function throttle(callback, delay = 1000) {
    var timeoutHandle = null;
    let throttleInner = function throttleInner() {
        let passedArgs = Array.from(arguments);
        if (timeoutHandle == null) {
            // NOTE: should the first call wait for the delay?
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

function debounce(callback, delay = 1000) {
    var timeoutHandle = null;
    let debounceInner = function debounceInner() {
        let passedArgs = Array.from(arguments);
        clearTimeout(timeoutHandle);
        timeoutHandle = setTimeout(function () {
            callback.apply(this, passedArgs);
        }.bind(this), delay || 1000);
    };
    if (!(this instanceof Window)) {
        debounceInner = debounceInner.bind(this);
    }
    return debounceInner;
}