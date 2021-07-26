String.prototype.includes = function (nativeIncludes) {
    console.warn("[Info] String.prototype.includes() has been modified.");
    return function (searchString, position, includesAll = false) {
        if (typeof searchString == "string") {
            return nativeIncludes.call(this, searchString, position);
        }
        else if (searchString instanceof Array) {
            if (includesAll) {
                for (let str of searchString) {
                    if (!nativeIncludes.call(this, str, position)) {
                        return false;
                    }
                }
                return true;
            } else {
                for (let str of searchString) {
                    if (nativeIncludes.call(this, str, position)) {
                        return true;
                    }
                }
                return false;
            }
        }
        return false;
    }
}(String.prototype.includes);