function toPrecision(number, precision, asNumber = true) {
    number = number.toFixed(precision);
    if (asNumber) {
        number = parseFloat(number);
    }
    return number;
}