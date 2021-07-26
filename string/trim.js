// WIP
// https://www.php.net/manual/en/function.trim.php
String.trim = function (string, characters = " \n\r\t\v\0") {
    console.info("[Info] String has been extended with a method: trim()");
    return function trim(string, characters) {
        let pattern = new RegExp("^" + characters + "|" + characters + "$");
        string = string.replace();
        return string;
    }
}();