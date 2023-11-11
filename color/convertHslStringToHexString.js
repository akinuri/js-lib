function convertHslStringToHexString(hslString) {
    let hsl = parseHslString(hslString);
    let rgb = convertHslToRgb(hsl);
    let hex = convertRgbToHex(rgb);
    let string = convertHexToString(hex);
    return string;
}