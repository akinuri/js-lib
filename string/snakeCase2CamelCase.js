/**
 * @requires String.prototype.toTitleCase()
 */
String.snakeCase2CamelCase = function () {
    console.info("[Info] String has been extended with a method: snakeCase2CamelCase()");
    return function snakeCase2CamelCase(snakeCaseStr) {
        let str   = snakeCaseStr;
        let words = str.split("_");
        let first = words.shift();
        words     = words.map(word => word.toTitleCase());
        str       = first + words.join("");
        return str;
    }
}();