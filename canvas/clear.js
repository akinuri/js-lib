CanvasRenderingContext2D.prototype.clear = function () {
    this.resetTransform();
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
};