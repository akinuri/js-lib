/**
 * Returns the sum of all numbers in the array.
 */
Array.prototype.sum = function () {
    console.warn("[Info] Array.prototype has been extended with sum() method.");
    return function () {
        if (this.length) {
            return this.reduce(function (sum, currentValue) {
                return (parseFloat(sum) || 0) + (parseFloat(currentValue) || 0);
            });
        }
        return null;
    }
}();