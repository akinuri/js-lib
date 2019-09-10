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
        Number.prototype.between(a, b [, min_inclusive [, max_inclusive]])
        Number.prototype.sign()
        
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

Number.prototype.between = (function () {
    console.warn("Number.prototype has been extended with .between(min, max, exclusive?) method.");
    return function (min, max, exclusive) {
        var min = min || 0;
        var max = max || 100;
        var exclusive = exclusive || false;
        if (!exclusive) {
            min--;
            max++;
        }
        return min < this && this < max;
    }
})();

Number.prototype.sign = function getSign() {
    return Math.sign(this);
};





/* ==================== MODIFY ==================== */

function number_clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
}
Number.prototype.clamp = function clamp(min, max) {
    return number_clamp(this, min, max);
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

// min and max are inclusive
Number.prototype.loop = function loop(min, max) {
    var min = min || 0;
    var max = max || 0;
    var result = this;
    var dist = Math.abs(max - min) + 1;
    if (this < min) {
        var underflow = Math.abs(this - min);
        var remainder = underflow % dist;
        if (remainder == 0) {
            result = min;
        } else {
            result = max - remainder + 1;
        }
    } else if (this > max) {
        var overflow = this - max;
        var remainder = overflow % dist;
        if (remainder == 0) {
            result = max;
        } else {
            result = min + remainder - 1;
        }
    }
    return result.valueOf();
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





/* ==================== CURRENCY ==================== */

Number.prototype.format = function number_format() {
    
};
