String.kebabCase2camelCase = function () {
    console.info("[Info] String has been extended with a method: kebabCase2camelCase()");
    return function kebabCase2camelCase(kebabCaseStr) {
        var words = kebabCaseStr.split("-");
        if (words.length > 1) {
            var camelCase = words.slice(1).map(function (word) {
                return word[0].toUpperCase() + word.slice(1);
            });
            return words[0] + camelCase.join("");
        }
        return words[0];
    }
}();
