function generateRandomString(length = 10) {
    let randomStr = parseInt(Math.random().toString().slice(2)).toString(36);
    while (randomStr.length < length) {
        randomStr += generateRandomString();
    }
    randomStr = randomStr.slice(-length);
    return randomStr;
}