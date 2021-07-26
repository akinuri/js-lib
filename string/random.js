String.random = function () {
    console.info("[Info] String has been extended with a method: random()");
    return function random(length = 8) {
        let randomStr = parseInt(Math.random().toString().slice(2)).toString(36);
        while (randomStr.length < length) {
            randomStr += String.random();
        }
        randomStr = randomStr.slice(-length);
        return randomStr;
    }
}();