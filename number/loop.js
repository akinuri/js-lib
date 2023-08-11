/* 
    loopType
        open  : first and the last values are NOT the same, e.g. 1-7 (days of week)
        close : first and the last values are the same, e.g. 0-360 degrees
 */
function loop(value, min, max, loopType = "open") {
    if (!["open", "close"].includes(loopType)) {
        throw new Error("Invalid loop type. Use 'open' or 'close'.");
    }
    let loopTypeOffset = loopType == "open" ? 1 : 0;
    let rangeSize = max - min + loopTypeOffset;
    value = (value - min) % rangeSize + min;
    if (value < min) {
        value += rangeSize;
    }
    return value;
}

// some tests

// let loopStart = 0;
// let loopEnd   = 360;
// let loopType  = "close";
// let loopRange = Math.abs(loopStart - loopEnd);
// let increase  = 1 * 60;
// for (let i = loopStart-loopRange*2; i < loopEnd+loopRange*2; i+=increase) {
    // console.log( i, loop(i, loopStart, loopEnd, loopType) );
// }

// let loopStart = 1;
// let loopEnd   = 7;
// let loopType  = "open";
// let loopRange = Math.abs(loopStart - loopEnd);
// let increase  = 1 * 1;
// for (let i = loopStart-loopRange*2; i < loopEnd+loopRange*2; i+=increase) {
    // console.log( i, loop(i, loopStart, loopEnd, loopType) );
// }
