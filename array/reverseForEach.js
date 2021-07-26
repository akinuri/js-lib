Array.prototype.reverseForEach = function (callback) {
    console.warn("[Info] Array.prototype has been extended with reverseForEach() method.");
    return function (callback) {
        if (this.length == 0 || !callback) {
            return;
        }
        for (let i = this.length - 1; i >= 0; i--) {
            callback(this[i], i);
        }
    };
}();
