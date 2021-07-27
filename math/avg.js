Math.avg = function () {
    var numbers = Array.from(arguments);
    return Math.sum(numbers) / numbers.length;
};