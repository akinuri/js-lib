// String.prototype.substring(start, ?end) == Array.prototype.slice(?start, ?end)
// String.prototype.substr(start, ?length) == Array.subarr(start, ?length)
Array.prototype.subarr = function () {
    console.warn("[Info] Array.prototype has been extended with subarr(start, ?length) method.");
    return function (start, length) {
        let start  = start || 0;
        if (length == undefined) {
            length = this.length;
        }
        if (start < 0) {
            start = this.length + start;
        }
        return this.slice(start, start + length);
    }
}();