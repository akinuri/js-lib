// https://stackoverflow.com/a/11972692/2202732
HTMLCollection.prototype.shuffle = function shuffleCollection() {
    for (var i = this.length; i >= 0; i--) {
        this[0].parentElement.appendChild(this[Math.random() * i | 0]);
    }
};