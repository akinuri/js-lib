// String.prototype.substring(start, ?end) == Array.prototype.slice(?start, ?end)
// String.prototype.substr(start, ?length) == Array.subarr(start, ?length)
function subarr(array, start, length) {
    let start  = start || 0;
    if (length == undefined) {
        length = array.length;
    }
    if (start < 0) {
        start = array.length + start;
    }
    return array.slice(start, start + length);
}