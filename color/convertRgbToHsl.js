function convertRgbToHsl(rgb) {
    let { red, green, blue, alpha } = rgb;
    red /= 255,
    green /= 255,
    blue /= 255;
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
        switch(max) {
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
    return {hue, saturation, lightness, alpha};
}