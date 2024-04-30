function convertHslToString(hsl) {
    let { hue, saturation, lightness, alpha } = hsl;
    let string = "";
    if (alpha !== undefined && alpha !== 1) {
        string = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    } else {
        string = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    return string;
}
