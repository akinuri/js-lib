function map(number, rangeA_start, rangeA_stop, rangeB_start, rangeB_stop) {
    let result =
        ( (number - rangeA_start) / (rangeA_stop - rangeA_start) )
        * (rangeB_stop - rangeB_start)
        + rangeB_start;
    return result;
};