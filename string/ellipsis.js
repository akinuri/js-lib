function ellipsis(string, maxLength, ellipsis = "...", trimLoc = "right", trimWS = false) {
    if (!string) {
        return string;
    }
    const validTrimLocs = ["left", "center", "right", "sides"];
    if (!validTrimLocs.includes(trimLoc)) {
        throw new Error("Invalid $trimLoc (" + trimLoc + ") argument.");
    }
    let ellipsisLength = ellipsis.length;
    if (trimLoc === "sides") {
        ellipsisLength *= 2;
    }
    let subString = string;
    const subStringLength = maxLength - ellipsisLength;
    if (string.length > maxLength) {
        switch (trimLoc) {
            case "left":
                subString = string.substr(-subStringLength);
                if (trimWS) {
                    subString = subString.trim();
                }
                subString = ellipsis + subString;
                break;
            case "right":
                subString = string.substr(0, subStringLength);
                if (trimWS) {
                    subString = subString.trim();
                }
                subString += ellipsis;
                break;
            case "center":
                const leftStringLength = Math.floor(subStringLength / 2);
                const rightStringLength = Math.ceil(subStringLength / 2);
                const leftString = string.substr(0, leftStringLength);
                const rightString = string.substr(-rightStringLength);
                if (trimWS) {
                    leftString = leftString.trim();
                    rightString = rightString.trim();
                }
                subString = leftString + ellipsis + rightString;
                break;
            case "sides":
                const leftTrimLength = Math.floor((string.length - subStringLength) / 2);
                subString = string.substr(leftTrimLength, subStringLength);
                if (trimWS) {
                    subString = subString.trim();
                }
                subString = ellipsis + subString + ellipsis;
                break;
        }
    }
    return subString;
}