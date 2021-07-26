String.prototype.latinize = function latinize(locale) {
    var str = this;
    var chars = [
        ["ç", "c"], ["ğ", "g"], ["ı", "i"], ["ö", "o"], ["ş", "s"], ["ü", "u"],
        ["Ç", "C"], ["Ğ", "G"], ["İ", "I"], ["Ö", "O"], ["Ş", "S"], ["Ü", "U"],
        ["i̇", "i"], ["ü", "u"],
    ];
    chars.forEach(function (c) {
        str = str.replace(c[0], c[1]);
    });
    return str;
}