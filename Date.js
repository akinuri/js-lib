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



Date.times = {
    s : 1000,
    m : 1000 * 60,
    h : 1000 * 60 * 60,
    d : 1000 * 60 * 60 * 24,
};

Date.timeStamp2Duration = function ts2duration(ts) {
    var duration = {
        s : null,
        m : null,
        h : null,
        d : null,
    };
    
    var remainder = 0;
    
    duration.d = Math.floor(ts / Date.times.d);
    remainder = ts % Date.times.d;
    if (duration.d == 0) remainder = ts;
    
    duration.h = Math.floor(remainder / Date.times.h);
    remainder = remainder % Date.times.h;
    if (duration.h == 0) remainder = ts;
    
    duration.m = Math.floor(remainder / Date.times.m);
    remainder = remainder % Date.times.m;
    if (duration.m == 0) remainder = ts;
    
    duration.s = Math.floor(remainder / Date.times.s);
    remainder = remainder % Date.times.s;
    
    return duration;
};
    
Date.duration2String = function duration2string(duration, after) {
    var str = [];
    if (duration.d) str.push(duration.d + " days");
    if (duration.h) str.push(duration.h + " hours");
    if (duration.m) str.push(duration.m + " minutes");
    // if (duration.s) str.push(duration.s + " seconds");
    if (after) {
        str.push(after);
    }
    return str.join(" ");
};
