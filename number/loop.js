function loop(min, max) {
    var min = min || 0;
    var max = max || 0;
    var num = this % max;
    if (num < min) {
        num += max;
    }
    return num;
}

// min and max are inclusive
function loop2(min, max) {
    var min = min || 0;
    var max = max || 0;
    var result = this;
    var dist = Math.abs(max - min) + 1;
    if (this < min) {
        var underflow = Math.abs(this - min);
        var remainder = underflow % dist;
        if (remainder == 0) {
            result = min;
        } else {
            result = max - remainder + 1;
        }
    } else if (this > max) {
        var overflow = this - max;
        var remainder = overflow % dist;
        if (remainder == 0) {
            result = max;
        } else {
            result = min + remainder - 1;
        }
    }
    return result.valueOf();
};