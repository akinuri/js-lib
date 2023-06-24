function inBetween(num, min, max, exclusive) {
    let exclusive = exclusive || false;
    if (!exclusive) {
        min--;
        max++;
    }
    return min < num && num < max;
}