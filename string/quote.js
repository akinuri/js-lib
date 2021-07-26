String.prototype.quote = function () {
    console.warn("[Info] String.prototype has been extended with a method: quote()");
    return function (quote = "\"") {
        return quote + this + quote;
    }
}();