function sum() {
    return Array.from(arguments).reduce(
        function (sum, currentValue) {
            return sum + (parseFloat(currentValue) || 0);
        },
        0,
    );
}