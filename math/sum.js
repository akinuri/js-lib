function sum() {
    let numbers = Array.from(arguments).flat(Infinity);
    return numbers.reduce(
        function (sum, currentValue) {
            return sum + (parseFloat(currentValue) || 0);
        },
        0,
    );
}