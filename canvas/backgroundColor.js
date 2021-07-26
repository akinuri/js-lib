CanvasRenderingContext2D.prototype.backgroundColor = function (color) {
    this.save();
    this.beginPath();
    this.rect(0, 0, this.canvas.width, this.canvas.height);
    this.fillStyle = color;
    this.fill();
    this.restore();
};