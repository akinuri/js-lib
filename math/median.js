function median() {
    let sorted = Array.from(arguments).sort();
    let values = [];
    if (sorted.length % 2) {
        values.push( sorted[ (sorted.length / 2) - 1 ] );
        values.push( sorted[  sorted.length / 2      ] );
    } else {
        values.push( sorted[ (sorted.length + 1) / 2 ] );
    }
    return avg(...values);
}