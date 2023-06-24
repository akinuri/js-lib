function stdev() {
    let values   = Array.from(arguments);
    let average  = avg(...values);
    let variance = values.map(value => value * value) / values.length;
    let stdev    = Math.sqrt(variance);
    return stdev;
}