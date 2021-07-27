Math.factorial = function (n) {
    var result = 1;
    while (n > 0) {
        result *= n;
        n--;
    }
    return result;
};