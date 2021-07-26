/**
 * Very basic string formatting.
 * 
 * Expects the string to include special placeholders.
 * 
 * Placeholders might be in the following forms:
 *  * {something}: something is a key that needs to be in the values object.
 *  * {2}: replace values are inserted using their indices. A key/index can be re-used.
 *  * {}: replace values are inserted using their indices with no control.
 * 
 * A mix of {key} and {} is not allowed. Method will fail and you'll get a warning.
 */
String.prototype.format = function formatString(values) {
    
    let string = this.valueOf();
    
    let placeholderPattern = /{[^{]*}/g;
    
    let placeholders = string.match(placeholderPattern);
    
    if (placeholders.length == 0) {
        return string;
    }
    
    if (typeof values == "undefined") {
        console.warn("Format operation aborted. Missing replace values.");
        return string;
    }
    else if (!(values instanceof Array) || typeof values != "object") {
        console.warn("Format operation aborted. Unexpected replace values type: " + typeof values);
        return string;
    }
    
    let useArrayIndices = placeholders.every(ph => ph == "{}");
    
    if (!useArrayIndices) {
        let indexKeyMix = placeholders.some(ph => ph == "{}");
        if (indexKeyMix) {
            console.warn("Format operation aborted. String includes inconsistent placeholders.");
            return string;
        }
    }
    
    if (useArrayIndices) {
        values = Array.from(values);
        let index = 0;
        string = string.replace(placeholderPattern, function (ph) {
            let value = ph;
            if (index in values) {
                value = values[index];
                index++;
            }
            return value;
        });
    } else {
        string = string.replace(placeholderPattern, function (ph) {
            let key = ph.slice(1, -1);
            if (key in values) {
                return values[key];
            }
            return ph;
        });
    }
    
    return string;
};