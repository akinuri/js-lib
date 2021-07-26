Object.renameKey = function renameObjectKey(obj, oldKey, newKey) {
    if (!(oldKey in obj)) {
        throw Error("There is no '"+oldKey+"' key in the passed object.");
        return false;
    }
    if (newKey in obj) {
        throw Error("The new key '"+newKey+"' already exists in the object.");
        return false;
    }
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
    return true;
};