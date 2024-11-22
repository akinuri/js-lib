function RGBColor(red, green, blue, alpha = 1) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
}

RGBColor.isRGBString = function (colorString) {
    return colorString.startsWith("rgb");
};

RGBColor.fromRGBString = function parseRGBString(rgbString) {
    let values = rgbString.trim();
    const isRgba = values.startsWith("rgba");
    values = values.replace(/rgba?\(|\)/g, "");
    values = values.split(",");
    values = values.map((value) => value.trim());
    if ((isRgba && values.length !== 4) || (!isRgba && values.length !== 3)) {
        throw new Error("Invalid RGB(A) color format.");
    }
    const red = parseInt(values[0]);
    const green = parseInt(values[1]);
    const blue = parseInt(values[2]);
    const alpha = isRgba ? parseFloat(values[3]) : 1;
    if (
        red < 0 ||
        red > 255 ||
        green < 0 ||
        green > 255 ||
        blue < 0 ||
        blue > 255 ||
        alpha < 0 ||
        alpha > 1
    ) {
        throw new Error("RGB(A) values out of range.");
    }
    return new RGBColor(red, green, blue, alpha);
};

RGBColor.prototype.toString = function convertRGBToString() {
    let { red, green, blue, alpha } = this;
    let string = "";
    if (alpha !== undefined && alpha !== 1) {
        alpha = parseFloat(alpha.toFixed(2));
        string = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    } else {
        string = `rgb(${red}, ${green}, ${blue})`;
    }
    return string;
};
