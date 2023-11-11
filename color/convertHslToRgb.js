function convertHslToRgb(hsl) {
    
    let { hue, saturation, lightness } = hsl;
    
    // hue        /= 360;
    saturation /= 100;
    lightness  /= 100;
    
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const hueSegment = hue / 60;
    const y = chroma * (1 - Math.abs(hueSegment % 2 - 1));
    
    let tmpRed   = 0;
    let tmpGreen = 0;
    let tmpBlue  = 0;
    
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
    const red   = tmpRed   + lightnessMatch;
    const green = tmpGreen + lightnessMatch;
    const blue  = tmpBlue  + lightnessMatch;
    
    const rgb = {
        red   : Math.round(red * 255),
        green : Math.round(green * 255),
        blue  : Math.round(blue * 255),
        alpha : 1,
    };
    
    return rgb;
}