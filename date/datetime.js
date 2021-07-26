Date.prototype.date = function () {
    var d = this.getDate().toString().padStart(2, 0);
    var m = (this.getMonth() + 1).toString().padStart(2, 0);
    var y = this.getFullYear();
    return y + "-" + m + "-" + d;
};

Date.prototype.time = function (safe) {
    var h = this.getHours().toString().padStart(2, 0);
    var m = this.getMinutes().toString().padStart(2, 0);
    var s = this.getSeconds().toString().padStart(2, 0);
    var seperator = ":";
    if (safe) 
        seperator = "-";
    return [h, m, s].join(seperator);
};

Date.prototype.datetime = function (safe) {
    return this.date() + " " + this.time(safe);
};

Date.date = function () {
    return (new Date()).date();
};

Date.time = function (safe) {
    return (new Date()).time(safe);
};

Date.datetime = function (safe) {
    return Date.date() + " " + Date.time(safe);
};