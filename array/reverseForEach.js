function reverseForEach(array, callback) {
    if (array.length == 0 || !callback) {
        return;
    }
    for (let i = array.length - 1; i >= 0; i--) {
        callback(array[i], i);
    }
}