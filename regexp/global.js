RegExp.global = function (re) {
    var pattern	= re.source;
    var flags	= re.global ? re.flags : re.flags += "g";
    return new RegExp(pattern, flags);
};