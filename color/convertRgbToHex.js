function convertRgbToHex(rgb) {
    const { red, green, blue, alpha } = rgb;
    const hexRed   = red.toString(16).padStart(2, '0');
    const hexGreen = green.toString(16).padStart(2, '0');
    const hexBlue  = blue.toString(16).padStart(2, '0');
    const hexAlpha = Math.round(alpha * 255).toString(16).padStart(2, '0');
    const hex = {
        red   : hexRed,
        green : hexGreen,
        blue  : hexBlue,
        alpha : hexAlpha,
    };
    return hex;
}