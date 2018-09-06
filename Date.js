/*
    Date.prototype.addMinutes(m)
    Date.prototype.date()
    Date.prototype.time()
    Date.prototype.datetime()
    Date.date()
    Date.time()
    Date.datetime()
 */

Date.prototype.date = function () {
    var d = this.getDate().toString().padStart(2, 0);
    var m = (this.getMonth() + 1).toString().padStart(2, 0);
    var y = this.getFullYear();
    return y + "-" + m + "-" + d;
};

Date.prototype.time = function () {
    var h = this.getHours().toString().padStart(2, 0);
    var m = this.getMinutes().toString().padStart(2, 0);
    var s = this.getSeconds().toString().padStart(2, 0);
    return h + ":" + m + ":" + s;
};

Date.prototype.datetime = function () {
    return this.date() + " " + this.time();
};

Date.date = function () {
    return (new Date()).date();
};

Date.time = function () {
    return (new Date()).time();
};

Date.datetime = function () {
    return Date.date() + " " + Date.time();
};

Date.prototype.addMinutes = function (m) {
    this.setMinutes(this.getMinutes() + m);
    return this;
};



Date.unixTimeConstants = {
    ms : 1,
    s  : 1000,
    m  : 1000 * 60,
    h  : 1000 * 60 * 60,
    d  : 1000 * 60 * 60 * 24,
};

Date.ut2duration = function ut2duration(ut) {
    var duration = {
        ms : null,
        s  : null,
        m  : null,
        h  : null,
        d  : null,
    };
    
    var remainder = 0;
    
    duration.d = Math.floor(ut / Date.unixTimeConstants.d);
    remainder  = ut % Date.unixTimeConstants.d;
    if (duration.d == 0)
        remainder = ut;
    
    duration.h = Math.floor(remainder / Date.unixTimeConstants.h);
    remainder  = remainder % Date.unixTimeConstants.h;
    if (duration.h == 0)
        remainder = ut;
    
    duration.m = Math.floor(remainder / Date.unixTimeConstants.m);
    remainder  = remainder % Date.unixTimeConstants.m;
    if (duration.m == 0)
        remainder = ut;
    
    duration.s = Math.floor(remainder / Date.unixTimeConstants.s);
    remainder  = remainder % Date.unixTimeConstants.s;
    if (duration.s == 0)
        remainder = ut;
    
    duration.ms = remainder;
    
    return duration;
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
