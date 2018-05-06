/*
    Arithmetic
        Number.prototype.invert()
        Number.prototype.round()
        Number.prototype.floor()
        Number.prototype.ceil()
        Number.prototype.pow(exponent)
        Number.prototype.sqrt()
        
    Checks
        Number.prototype.isOdd()
        Number.prototype.isEven()
        Number.isFloat(n)
        Number.isNumeric(value)
        Number.prototype.between(a, b [, inclusive])
        
    Modify
        Number.prototype.clamp(min, max)
        Number.prototype.loop(min, max)
        Number.prototype.map(start1, stop1, start2, stop2)
        
    Parts
        Number.prototype.decimal()
        Number.prototype.fraction()
        Number.prototype.precision()
*/





/* ==================== ARITHMETIC ==================== */

Number.prototype.invert = function () {
    return -1 * this;
}

Number.prototype.round = function () {
    return Math.round(this);
}

Number.prototype.floor = function () {
    return Math.floor(this);
}

Number.prototype.ceil = function () {
    return Math.ceil(this);
}

Number.prototype.pow = function (exponent) {
    return Math.pow(this, exponent);
}

Number.prototype.sqrt = function () {
    return Math.sqrt(this);
}





/* ==================== CHECKS ==================== */

Number.prototype.isOdd = function () {
    return this % 2 == 1;
}

Number.prototype.isEven = function () {
    return this % 2 == 0;
}

Number.isFloat = function isFloat(n) {
    return typeof n == "number" && isFinite(n) && n % 1 !== 0;
};

// requires Number.isFloat()
Number.isNumeric = function isNumeric(value) {
    return Number.isInteger(value) || Number.isFloat(value);
};

Number.prototype.between = function between(a, b, inclusive) {
    var min = Math.min(a, b);
    var max = Math.max(a, b);
    if (inclusive) {
        if (min <= this && this <= max) return true;
    } else {
        if (min < this && this < max) return true;
    }
    return false;
};





/* ==================== MODIFY ==================== */

Number.prototype.clamp = function clamp(min, max) {
    return Math.min(Math.max(this, min), max);
};

Number.prototype.loop = function loop(min, max) {
    var min = min || 0;
    var max = max || 0;
    var num = this % max;
    if (num < min) {
        num += max;
    }
    return num;
};

Number.prototype.map = function map(start1, stop1, start2, stop2) {
    return ( (this - start1) / (stop1-start1) ) * (stop2 - start2) + start2;
};





/* ==================== PARTS ==================== */

Number.prototype.decimal = function getDecimal() {
    return parseInt(this, 10);
};

// requires Number.isFloat()
Number.prototype.fraction = function getFraction() {
    var f = parseFloat(this);
    if (Number.isFloat(f)) return parseFloat("0." + f.toString().split(".")[1]);
    return 0;
};

// requires Number.isFloat()
Number.prototype.precision = function getSetPecision() {
    if (arguments.length == 1 && Number.isInteger(arguments[0])) {
        return parseFloat(this.toFixed(arguments[0]));
    } else if (Number.isFloat(this)) {
        return this.toString().split(".")[1].length;
    }
    return 0;
};
