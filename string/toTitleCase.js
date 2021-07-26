String.prototype.toTitleCase = function () {
    console.info("[Info] String.prototype has been extended with a method: toTitleCase()");
    return function toTitleCase() {
        let words = this.split(" ");
        words = words.map(word => word[0].toUpperCase() + word.slice(1));
        let str = words.join(" ");
        return str;
    }
}();