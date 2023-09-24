/**
 * @see https://en.wikipedia.org/wiki/Transliteration
 * @see https://en.wikipedia.org/wiki/Romanization
 * @see https://stackoverflow.com/a/34867642/2202732
 */
function latinize(text) {
    let letterMap = Object.assign({}, latinize.LATINIZATION_MAP);
    latinize.regexifyLatinizationMap(letterMap);
    for (let targetChar in letterMap) {
        let cases = letterMap[targetChar];
        text = text.replace(cases, targetChar);
    }
    return text;
}

latinize.regexifyLatinizationMap = function (letterMap) {
    for (let targetChar in letterMap) {
        let cases = letterMap[targetChar];
        cases = cases.replaceAll(" ", "|");
        cases = new RegExp(cases);
        letterMap[targetChar] = cases;
    }
};

latinize.LATINIZATION_MAP = {
    "a"  : "à á â ã ä å æ",
    "c"  : "ç",
    "d"  : "ð",
    "e"  : "è é ê ë",
    "g"  : "ğ",
    "i"  : "ì í î ï i̇ ı",
    "m"  : "μ",
    "n"  : "ñ",
    "o"  : "ò ó ô õ ö ø",
    "oe" : "œ",
    "s"  : "ş",
    "sh" : "š",
    "th" : "þ",
    "u"  : "ù ú û ü",
    "y"  : "ý ÿ",
    
    "A"  : "À Á Â Ä Å Æ Ã Ā",
    "C"  : "Ç",
    "D"  : "Ð",
    "E"  : "È É Ê Ë",
    "G"  : "Ğ",
    "I"  : "Ì Í Î Ï İ",
    "N"  : "Ñ",
    "O"  : "Ò Ó Ô Õ Ö Ø",
    "OE" : "Œ",
    "S"  : "ß Ş",
    "SH" : "Š",
    "TH" : "Þ",
    "U"  : "Ù Ú Û Ü",
    "Y"  : "Ý Ÿ",
};