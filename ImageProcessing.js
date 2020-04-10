function Pixel(imageData, index, origin) {
    this.pos   = index2pos(imageData, index);
    this.dist  = null;
    this.angle = null;
    if (origin) {
        this.dist  = calcDist(origin, this.pos);
        this.angle = calcAngle(origin, this.pos);
    }
}

function calcDist(p1, p2) {
    var a = p1.y - p2.y;
    var b = p1.x - p2.x;
    return Math.sqrt(a*a + b*b);
}

function calcAngle(origin, target) {
    var theta = Math.atan2(target.y - origin.y, target.x - origin.x) * (180 / Math.PI);
    if (theta < 0) theta = 360 + theta;
    return theta;
}

function calcPos(origin, angle, length) {
    angle *= Math.PI / 180;
    return {
        x : Math.round(origin.x + length * Math.cos(angle)),
        y : Math.round(origin.y + length * Math.sin(angle)),
    };
}


/**
 * Returns the pixel array at the specified position.
 */
function getPixel(imageData, x, y) {
    return getPixelByIndex(imageData, pos2index(imageData, x, y));
}

/**
 * Returns the RGBA values at the specified index.
 */
function getPixelByIndex(imageData, index) {
    return [
        imageData.data[index + 0],
        imageData.data[index + 1],
        imageData.data[index + 2],
        imageData.data[index + 3],
    ];
}

/**
 * Returns the index of a position.
 */
function pos2index(imageData, x, y) {
    return 4 * (y * imageData.width + x);
}


function setPixel(imageData, x, y, rgbaArray) {
    setPixelByIndex(imageData, pos2index(imageData, x, y), rgbaArray);
}


function setPixelByIndex(imageData, index, rgbaArray) {
    imageData.data[index + 0] = rgbaArray[0];
    imageData.data[index + 1] = rgbaArray[1];
    imageData.data[index + 2] = rgbaArray[2];
    imageData.data[index + 3] = rgbaArray[3];
}


function index2pos(imageData, index) {
    index /= 4;
    return {
        x : index % imageData.width,
        y : Math.floor(index / imageData.width),
    }
}