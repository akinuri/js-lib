HTMLElement.prototype.getIndex = function () {
    if (this.parentElement) {
        return Array.from(this.parentElement.children).indexOf(this);
    }
    return -1;
};