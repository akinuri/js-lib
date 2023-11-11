function parseHslString(hslString) {
    let values = hslString;
    values = values.replace(/hsl\(|\)/g, "");
    values = values.split(",");
    values = values.map(value => value.trim());
    if (values.length !== 3) {
        throw new Error("Invalid HSL color format.");
    }
    const hue       = parseInt(values[0]);
    const satuation = parseInt(values[1].replace("%", ""));
    const lightness = parseInt(values[2].replace("%", ""));
    const hsl = {
        hue,
        satuation,
        lightness,
        alpha: 1,
    };
    return hsl;
}