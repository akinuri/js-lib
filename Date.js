/*
    Date.datetime()
 */

Date.prototype.addMinutes = function (m) {
    this.setMinutes(this.getMinutes() + m);
    return this;
};



Date.duration2String = function duration2string(duration, options) {
    var str = [];
    var options = options || {d : 1, h : 1, m : 1, s : 1, ms : 1};
    if (duration.d && options.d) str.push(duration.d + " days");
    if (duration.h && options.h) str.push(duration.h + " hours");
    if (duration.m && options.m) str.push(duration.m + " minutes");
    if (duration.s && options.s) str.push(duration.s + " seconds");
    if (duration.ms && options.ms) str.push(duration.ms + " milliseconds");
    return str.join(" ");
};
