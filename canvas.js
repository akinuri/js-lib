HTMLCanvasElement.prototype.snapshot = function() {
    return "url(" + this.toDataURL() + ")";
};

if (!CanvasRenderingContext2D.prototype.resetTransform) {
    CanvasRenderingContext2D.prototype.resetTransform = function() {
        this.setTransform(1, 0, 0, 1, 0, 0);
    };
}

CanvasRenderingContext2D.prototype.clear = function () {
    this.resetTransform();
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

CanvasRenderingContext2D.prototype.background = function (color) {
    this.save();
    this.beginPath();
    this.rect(0, 0, this.canvas.width, this.canvas.height);
    this.fillStyle = color;
    this.fill();
    this.restore();
};