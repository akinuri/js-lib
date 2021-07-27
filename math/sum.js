Math.sum = function () {
    return Array.from(arguments).reduce(function (sum, currentValue) {
        return sum + currentValue;
    });
};