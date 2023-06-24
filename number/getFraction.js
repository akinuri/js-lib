function getFraction(number) {
    var f = parseFloat(number);
    if (Number.isFloat(f)) {
        return parseFloat("0." + f.toString().split(".")[1]);
    }
    return 0;
};