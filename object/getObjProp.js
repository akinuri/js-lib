/**
 * Safe object property access.
 */
function getObjProp(obj, prop, fallback = null) {
    return obj.hasOwnProperty(prop) ? obj.prop : fallback;
}