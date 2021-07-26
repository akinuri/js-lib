/**
 * @requires String.prototype.latinize
 */
function urlFriendly(str) {
    var weirds = [
        ["¦",   ""],
        [" - ", " "],
        ["&",   "n"],
    ];
    var str = str.latinize();
    var str = str.toLowerCase();
    for (let chr in weirds) {
        str = str.replace(chr[0], chr[1]);
    }
    str = str.split(/\s+/g);
    return str.join("-");
};