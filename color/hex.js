function HexColor(red, green, blue, alpha = "FF") {
    RGBColor.apply(this, arguments);
}

HexColor.isHexString = function (colorString) {
    return colorString.startsWith("#");
};

HexColor.fromHexString = function parseHexString(hexString) {
    if (!/^#([a-fA-F0-9]{3,4}|[a-fA-F0-9]{6,8})$/.test(hexString)) {
        throw new Error("Invalid hex color format.");
    }
    let hex = hexString.slice(1);
    if (hex.length === 3 || hex.length === 4) {
        hex = hex
            .split("")
            .map((char) => char + char)
            .join("");
    }
    const red = hex.slice(0, 2);
    const green = hex.slice(2, 4);
    const blue = hex.slice(4, 6);
    const alpha = hex.length === 8 ? hex.slice(6, 8) : undefined;
    return new HexColor(red, green, blue, alpha);
};

HexColor.prototype.toString = function convertHexToString(alphaPos = "right") {
    let { red, green, blue, alpha } = this;
    let string = red + green + blue;
    if (alphaPos === "left") {
        string = alpha + string;
    } else if (alphaPos === "right") {
        string = string + alpha;
    }
    string = "#" + string;
    return string;
};

HexColor.fromRGBColor = function convertRGBToHex(rgbColor) {
    let { red, green, blue, alpha } = rgbColor;
    red = red.toString(16).padStart(2, "0");
    green = green.toString(16).padStart(2, "0");
    blue = blue.toString(16).padStart(2, "0");
    alpha = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0");
    return new HexColor(red, green, blue, alpha);
};

HexColor.prototype.toRGBColor = function convertHexToRGB() {
    let { red, green, blue, alpha } = this;
    red = parseInt(red, 16);
    green = parseInt(green, 16);
    blue = parseInt(blue, 16);
    alpha = parseInt(alpha, 16) / 255;
    return new RGBColor(red, green, blue, alpha);
};
