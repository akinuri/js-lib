// this appears to break $.ajax
Object.prototype.length = function objLength() {
    return Object.keys(this).length;
};


/**
 * Safe object property access.
 */
function objProp(obj, prop, fallback = null) {
    return obj.hasOwnProperty(prop) ? obj.prop : fallback;
}


