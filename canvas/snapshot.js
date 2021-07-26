HTMLCanvasElement.prototype.snapshot = function() {
    return "url(" + this.toDataURL() + ")";
};