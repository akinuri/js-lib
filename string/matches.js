String.prototype.matches = function (regex) {
    var results = [];
    var match   = null;
    var regex   = RegExp.global(regex);
    while (match = regex.exec(this)) {
        var result = {
            match  : match.shift(),
            index  : match.index,
            input  : match.input,
        };
        if (match.length > 0) {
            result.groups = [];
            match.forEach(function (g) {
                result.groups.push(g);
            });
        }
        results.push(result);
    }
    return results;
};