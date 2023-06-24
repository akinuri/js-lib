function randomNumber(min = null, max = null, round = null) {
    switch (arguments.length) {
        case 1:
            if (typeof min == "boolean") {
                round = min;
                max = null;
                min = null;
            } else {
                max = min;
                min = 0;
            }
            break;
        case 2: 
            if (typeof max == "boolean") {
                round = max;
                max = min;
                min = 0;
            }
            break;
    }
    let random = Math.random();
    if (min !== null && max !== null) {
        random = min + random * (max - min);
    }
    if (round === true) {
        random = Math.round(random);
    }
    return random;
}