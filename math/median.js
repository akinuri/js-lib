Math.median = function () {
    var sorted = Array.from(arguments).sort();
    var values = [];
    if (sorted.length % 2) {
        values.push( sorted[ (sorted.length / 2) - 1 ] );
        values.push( sorted[  sorted.length / 2      ] );
    } else {
        values.push( sorted[ (sorted.length + 1) / 2 ] );
    }
    return Math.avg.apply(null, values);
};