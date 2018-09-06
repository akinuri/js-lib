// this appears to break $.ajax
Object.prototype.length = function objLength() {
    return Object.keys(this).length;
};