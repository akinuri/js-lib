String.prototype.toBinary = function string2binary(sep) {
    var seperator = "";
    if (sep) {
        if (typeof sep == "string") {
            seperator = sep;
        } else if (sep == true) {
            seperator = " ";
        }
    }
    return this.split("").map(function (l) {
        return l.charCodeAt(0).toString(2).padStart(8, "0");
    }).join(seperator);
};