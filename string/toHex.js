String.prototype.toHex = function str2hex() {
    return this.split("").map(function (chr) {
        return chr.charCodeAt(0).toString(16);
    }).join("");
}