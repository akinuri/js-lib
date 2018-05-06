/*
    Date.prototype.addMinutes(m)
    Date.prototype.date()
    Date.prototype.time()
    Date.prototype.datetime()
    Date.date()
    Date.time()
    Date.datetime()
 */


Date.prototype.addMinutes = function (m) {
    this.setMinutes(this.getMinutes() + m);
    return this;
};

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