/*
    String.prototype.includes(substr [, startIndex])
    String.prototype.capitalize([locale])
    String.prototype.latinize()
    String.prototype.toHex()
    String.prototype.toInt()
    String.prototype.toFloat()
    String.prototype.toBinary()
    String.prototype.insert(index, string)
    String.prototype.matches(regex)
 */

String.prototype.includes = function (includes) {
    console.warn("String.prototype.includes() has been modified.");
    return function (searchString, position) {
        if (searchString instanceof Array) {
            for (var i = 0; i < searchString.length; i++) {
                if (includes.call(this, searchString[i], position)) {
                    return true;
                }
            }
            return false;
        } else {
            return includes.call(this, searchString, position);
        }
    }
}(String.prototype.includes);

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

String.prototype.latinize = function capitalize(locale) {
    var str = this;
    var chars = [
        ["ç", "c"], ["ğ", "g"], ["ı", "i"], ["ö", "o"], ["ş", "s"], ["ü", "u"],
        ["Ç", "C"], ["Ğ", "G"], ["İ", "I"], ["Ö", "O"], ["Ş", "S"], ["Ü", "U"],
        ["i̇", "i"],
    ];
    chars.forEach(function (c) {
        str = str.replace(c[0], c[1]);
    });
    return str;
}

String.prototype.toHex = function str2hex() {
    return this.split("").map(function (chr) {
        return chr.charCodeAt(0).toString(16);
    }).join("");
}

String.prototype.toInt = function str2int(radix) {
    return parseInt(this, radix);
}

String.prototype.toFloat = function str2float() {
    return parseFloat(this);
}


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


String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};


String.prototype.matches = function (regex) {
    var results = [];
    var match	= null;
    var regex	= RegExp.global(regex);
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


function latinize(str) {
    var chars = [
        ["ç", "c"], ["ğ", "g"], ["ı", "i"], ["ö", "o"], ["ş", "s"], ["ü", "u"], ["ü", "u"],
        ["Ç", "C"], ["Ğ", "G"], ["İ", "I"], ["Ö", "O"], ["Ş", "S"], ["Ü", "U"],
        ["i̇", "i"],
    ];
    for (let chr in chars) {
        str = str.replace(chars[chr][0], chars[chr][1]);
    }
    return str;
};

function urlFriendly(str) {
    var weirds = [
        ["¦",   ""],
        [" - ", " "],
        ["&",   "n"],
    ];
    var str = latinize(str);
    var str = str.toLowerCase();
    for (let chr in weirds) {
        str = str.replace(chr[0], chr[1]);
    }
    str = str.split(/\s+/g);
    return str.join("-");
};





/* String.format = function formatString() {
    
    if (arguments.length == 0) {
        console.warn("Missing string.");
        return;
    }
    
    if (arguments.length == 1 && typeof arguments[0] == "string") {
        console.warn("Missing arguments.");
        return arguments[0];
    }
    
    if (arguments.length > 1 && typeof arguments[0] == "string") {
        var input = arguments[0];
        var args  = Array.prototype.slice.call(arguments, 1);
        var placeholders = {};
        
        (input.match(/{\d+}/g) || []).forEach(function (match) {
            var n = match.match(/\d+/g)[0];
            if (placeholders[n]) {
                placeholders[n]++;
            } else {
                placeholders[n] = 1;
            }
        });
        
        var indices = Object.keys(placeholders).map(function (item) { return parseInt(item) }).sort();
        
        if (indices && indices[0] == 0 && indices[indices.length - 1] == indices.length - 1) {
            if (indices.length <= args.length) {
                return input.replace(/{(\d+)}/g, function(match, number) {
                    if (args[number] != "undefined" && args[number] != null) {
                        return args[number].toString();
                    }
                });
            } else {
                console.warn("Placeholders should be less than or equal to the argument list.");
                return;
            }
        } else {
            console.warn("Invalid placeholder indices. They should start with 0 and increment by 1.");
                return;
        }
    }
    
    console.warn("Invalid input.");
    return;
}; */