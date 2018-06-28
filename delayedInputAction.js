function delayedInputAction(inputElement, eventName, callback, delay, onchange) {
    var timeoutHandler = null;
    var savedValue    = "";
    inputElement.addEventListener(eventName, function (e) {
        if (onchange) {
            if (savedValue != inputElement.value) {
                clearTimeout(timeoutHandler);
                timeoutHandler = setTimeout(function () {
                    savedValue = inputElement.value;
                    callback.call(inputElement, e);
                }, delay);
            }
        } else {
            clearTimeout(timeoutHandler);
            timeoutHandler = setTimeout(function () {
                callback.call(inputElement, e);
            }, delay);
        }
    });
}