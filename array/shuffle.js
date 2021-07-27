Array.prototype.shuffle = function shuffle() {
    for (var i = this.length - 1; i > 0; i--) {
        var random  = Math.floor(Math.random() * (i + 1));
        var temp    = this[i];
        this[i]     = this[random];
        this[random] = temp;
    }
};