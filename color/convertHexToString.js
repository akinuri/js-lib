function convertHexToString(
    hex,
    includeHash = true,
    includeAlpha = false,
    alphaPos = "right",
) {
    let string = hex.red + hex.green + hex.blue;
    if (includeAlpha) {
        if (alphaPos === "left") {
            string = hex.alpha + string;
        } else {
            string = string + hex.alpha;
        }
    }
    if (includeHash) {
        string = "#" + string;
    }
    return string;
}