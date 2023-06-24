function isFloat(n) {
    return typeof n == "number" && isFinite(n) && n % 1 !== 0;
};