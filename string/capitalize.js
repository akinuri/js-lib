String.prototype.capitalize = function capitalize(locale) {
    var words = this.split(" ");
    words = words.map(function (word) {
        var initial = word[0];
        var rest    = word.slice(1);
        if (locale) {
            return initial.toLocaleUpperCase(locale) + rest.toLocaleLowerCase(locale);
        }
        return initial.toUpperCase() + rest.toLowerCase();
    });
    return words.join(" ");
}