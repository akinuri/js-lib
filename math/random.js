// randomNumber(max)
// randomNumber(isRound)
// randomNumber(max, isRound)
// randomNumber(min, max, isRound)
function randomNumber() {
    let min     = null;
    let max     = null;
    let isRound = null;
    switch (arguments.length) {
        case 1:
            if (typeof arguments[0] == "boolean") {
                isRound = arguments[0];
            } else {
                max = arguments[0];
            }
            break;
        case 2:
            max     = arguments[0];
            isRound = arguments[1];
            break;
        case 3:
            min     = arguments[0];
            max     = arguments[1];
            isRound = arguments[2];
            break;
    }
    let random = Math.random();
    if (min !== null && max !== null) {
        random = min + random * (max - min);
    }
    if (isRound === true) {
        random = Math.round(random);
    }
    return random;
}