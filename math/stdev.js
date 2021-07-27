Math.stdev = function () {
    var values = Array.from(arguments);
    var average = Math.avg.apply(null, values);
    var variance = values.map(value => value * value) / values.length;
    var stdev = Math.sqrt(variance);
    return stdev;
};