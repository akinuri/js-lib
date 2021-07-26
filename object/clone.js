/**
 * TODO: add different methods
 */
Object.clone = function cloneObject(obj, method = "json") {
    if (method == "json") {
        return JSON.parse(JSON.stringify(obj));
    }
    return {};
};