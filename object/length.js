// this appears to break $.ajax
Object.prototype.length = function getObjLength() {
    return Object.keys(this).length;
};