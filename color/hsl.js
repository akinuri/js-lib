function HSLColor(hue, saturation, lightness, alpha = 1) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.alpha = alpha;
}

HSLColor.isHSLString = function (colorString) {
    return colorString.startsWith("hsl");
};

HSLColor.fromHSLString = function parseHSLString(hslString) {
    let values = hslString.trim();
    const isHsla = values.startsWith("hsla");
    values = values.replace(/hsla?\(|\)/g, "");
    values = values.split(",");
    values = values.map((value) => value.trim());
    if ((isHsla && values.length !== 4) || (!isHsla && values.length !== 3)) {
        throw new Error("Invalid HSL(A) color format.");
    }
    const hue = parseInt(values[0]);
    const saturation = parseInt(values[1].replace("%", ""));
    const lightness = parseInt(values[2].replace("%", ""));
    const alpha = isHsla ? parseFloat(values[3]) : 1;
    if (
        hue < 0 ||
        hue > 360 ||
        saturation < 0 ||
        saturation > 100 ||
        lightness < 0 ||
        lightness > 100 ||
        alpha < 0 ||
        alpha > 1
    ) {
        throw new Error("HSL(A) values out of range.");
    }
    return new HSLColor(hue, saturation, lightness, alpha);
};

HSLColor.prototype.toString = function convertHSLToString() {
    let { hue, saturation, lightness, alpha } = this;
    let string = "";
    if (alpha !== undefined && alpha !== 1) {
        string = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    } else {
        string = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    return string;
};

HSLColor.fromString = function parseColorString(colorString) {
    if (RGBColor.isRGBString(colorString)) {
        return HSLColor.fromRGB(RGBColor.fromString(colorString));
    } else if (HexColor.isHexString(colorString)) {
        return HSLColor.fromRGB(HexColor.fromString(colorString).toRGBColor());
    } else if (HSLColor.isHSLString(colorString)) {
        return HSLColor.fromHSLString(colorString);
    }
};

HSLColor.fromRGBColor = function convertRGBToHSL(rgbColor) {
    let { red, green, blue, alpha } = rgbColor;
    (red /= 255), (green /= 255), (blue /= 255);
    let max = Math.max(red, green, blue);
    let min = Math.min(red, green, blue);
    let lightness = (max + min) / 2;
    let hue;
    let saturation;
    if (max == min) {
        hue = 0;
        saturation = 0;
    } else {
        let chroma = max - min;
        saturation = chroma / (1 - Math.abs(2 * lightness - 1));
        switch (max) {
            case red:
                hue = (green - blue) / chroma + (green < blue ? 6 : 0);
                break;
            case green:
                hue = (blue - red) / chroma + 2;
                break;
            case blue:
                hue = (red - green) / chroma + 4;
                break;
        }
    }
    hue = Math.round(hue * 60);
    saturation = Math.round(saturation * 100);
    lightness = Math.round(lightness * 100);
    return new HSLColor(hue, saturation, lightness, alpha);
};

HSLColor.prototype.toRGBColor = function convertHSLToRGB() {
    let { hue, saturation, lightness, alpha } = this;

    // hue /= 360;
    saturation /= 100;
    lightness /= 100;

    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const hueSegment = hue / 60;
    const y = chroma * (1 - Math.abs((hueSegment % 2) - 1));

    let tmpRed = 0;
    let tmpGreen = 0;
    let tmpBlue = 0;

    if (hueSegment >= 0 && hueSegment < 1) {
        tmpRed = chroma;
        tmpGreen = y;
    } else if (hueSegment >= 1 && hueSegment < 2) {
        tmpGreen = chroma;
        tmpRed = y;
    } else if (hueSegment >= 2 && hueSegment < 3) {
        tmpGreen = chroma;
        tmpBlue = y;
    } else if (hueSegment >= 3 && hueSegment < 4) {
        tmpBlue = chroma;
        tmpGreen = y;
    } else if (hueSegment >= 4 && hueSegment < 5) {
        tmpBlue = chroma;
        tmpRed = y;
    } else {
        tmpRed = chroma;
        tmpBlue = y;
    }

    const lightnessMatch = lightness - chroma / 2;
    let red = tmpRed + lightnessMatch;
    let green = tmpGreen + lightnessMatch;
    let blue = tmpBlue + lightnessMatch;

    red = Math.round(red * 255);
    green = Math.round(green * 255);
    blue = Math.round(blue * 255);

    return new RGBColor(red, green, blue, alpha);
};
