// https://stackoverflow.com/questions/27078285/simple-throttle-in-js/51493084#51493084

function throttle(callback, delay) {
    var timeoutHandler = null;
    return function () {
        if (timeoutHandler == null) {
            timeoutHandler = setTimeout(function () {
                callback();
                timeoutHandler = null;
            }, delay);
        }
    }
}

function debounce(callback, delay) {
    var timeoutHandler = null;
    return function () {
        clearTimeout(timeoutHandler);
        timeoutHandler = setTimeout(function () {
            callback();
        }, delay);
    }
}