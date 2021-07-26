function isScalar(arg) {
    if (arguments.length != 1) {
        throw Error("isScalar() method is missing an argument.");
    }
    let argType = typeof arg;
    let scalarTypes = ["string", "number", "undefined", "boolean", "bigint", "symbol"];
    if (scalarTypes.includes(argType)) {
        return true;
    }
    if (arg === null) {
        return true;
    }
    return false;
};