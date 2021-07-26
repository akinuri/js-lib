/**
 * Returns the average of the numbers in the array.
 * @requires Array.prototype.sum
 */
Array.prototype.avg = function calculateAverage() {
    console.warn("[Info] Array.prototype has been extended with avg() method.");
    return function () {
        return this.sum() / this.length;
    }
}();