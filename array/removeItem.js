// for scalar values?
Array.prototype.removeItem = function (item) {
    var itemIndex = this.indexOf(item);
    if (itemIndex > -1) {
        this.splice(itemIndex, 1);
    }
    return itemIndex;
};