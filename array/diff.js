function arrayDiff(arrayA, arrayB) {
    return arrayA.filter(item => !arrayB.includes(item));
}