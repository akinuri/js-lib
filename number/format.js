Number.format = function formatNumber() {
    
    console.info("[Info] Number has been extended with a method: format()");
    
    // https://en.wikipedia.org/wiki/Decimal_separator
    let ALLOWED_DECIMAL_SEPERATORS = [".", ",", "_"];
    
    // https://en.wikipedia.org/wiki/Decimal_separator#Digit_grouping
    // https://en.wikipedia.org/wiki/ISO_31-0#Numbers
    let ALLOWED_THOUSAND_SEPERATORS = [".", ",", "", " ", "'", false];
    
    /**
     * Format a number with grouped thousands.
     * 
     * @link https://www.php.net/manual/en/function.number-format.php
     * 
     * @param {string|number} number 
     * @param {number} decimals             An integer
     * @param {string} decimalSeperator     A dot, comma, etc.
     * @param {string} thousandSeperator    A dot, comma, space, etc.
     */
    return function format(number, decimals = 0, decimalSeperator = ".", thousandSeperator = ",") {
        
        if (isNaN(parseFloat(number))) {
            throw new Error("Invalid number: " + number);
        }
        
        if (!Number.isInteger(decimals) && decimals !== true) {
            throw new Error("Value passed to decimals parameter must be an integer or TRUE.");
        }
        
        if (!ALLOWED_DECIMAL_SEPERATORS.includes(decimalSeperator)) {
            throw new Error("Invalid decimal seperator: " + decimalSeperator);
        }
        
        if (!ALLOWED_THOUSAND_SEPERATORS.includes(thousandSeperator)) {
            throw new Error("Invalid thousand seperator: " + thousandSeperator);
        }
        
        if (decimalSeperator == thousandSeperator) {
            throw new Error("Decimal seperator and thousand seperator can't be identical."); // right?
        }
        
        number = parseFloat(number);
        
        let isNegative = false;
        
        if (number < 0) {
            isNegative = true;
            number = Math.abs(number);
        }
        
        // do not shorten decimals
        if (decimals === true) {
            number = number.toString();
        } else {
            number = number.toFixed(decimals);
        }
        
        let [integer, decimal = ""] = number.split(".");
        
        if (thousandSeperator) {
            integer = integer.split("").reverse().join("");
            integer = integer.match(/.{1,3}/g).join(thousandSeperator);
            integer = integer.split("").reverse().join("");
        }
        
        number = (isNegative ? "-" : "") + integer + (decimal ? decimalSeperator : "") + decimal;
        
        return number;
    }
    
}();

Number.prototype.format = function () {
    console.info("[Info] Number.prototype has been extended with a method: format()");
    return function formatNumber(decimals = 0, decimalSeperator = ".", thousandSeperator = ",") {
        return Number.format(this, decimals, decimalSeperator, thousandSeperator);
    }
}();