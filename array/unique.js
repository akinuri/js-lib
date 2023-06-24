function unique(array) {
    return array.filter(function (item, index, array) {
        return array.indexOf(item) == index;
    });
}