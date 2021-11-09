// https://stackoverflow.com/questions/27078285/simple-throttle-in-js/51493084#51493084

function throttle(callback, delay) {
    var timeoutHandler = null;
    return function throttleInner() {
        let passedArgs = Array.from(arguments);
        if (timeoutHandler == null) {
            timeoutHandler = setTimeout(function () {
                callback.apply(this, passedArgs);
                timeoutHandler = null;
            }.bind(this), delay);
        }
    }.bind(this);
}

function debounce(callback, delay) {
    var timeoutHandler = null;
    return function debounceInner() {
        let passedArgs = Array.from(arguments);
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(function () {
            callback.apply(this, passedArgs);
        }.bind(this), delay);
    }.bind(this);
}