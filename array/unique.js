Array.prototype.unique = function () {
    return this.filter(function (item, index, array) {
        return array.indexOf(item) == index;
    });
};