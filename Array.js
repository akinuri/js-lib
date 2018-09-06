/*
    Native
        Array.prototype.subarray()
    
    Content
        Array.prototype.shuffe()
    
    Modify
        Array.prototype.removeItem(item)
        Array.prototype.removeItemByIndex(index)
    
    Access
        Array.prototype.lastItem()
        Array.prototype.lastIndex()
        Array.prototype.randomItems(count)
        Array.prototype.randomItem()
        
    Math
        Array.prototype.sum()
        Array.prototype.average()
        Array.prototype.min()
        Array.prototype.max()
        Array.prototype.mult(factor)
*/





/* ==================== NATIVE ==================== */

Array.prototype.subarray = function (start, length) {
    start  = start || 0;
    length = length || this.length;
    if (start < 0) {
        return this.slice(this.length + start);
    }
    return this.slice(start, start + length);
};





/* ==================== CONTENT ==================== */

Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i--) {
        var random	= Math.floor(Math.random() * (i + 1));
        var temp	= this[i];
        this[i]		= this[random];
        this[random] = temp;
    }
};

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var random	= Math.floor(Math.random() * (i + 1));
        var temp	= array[i];
        array[i]		= array[random];
        array[random] = temp;
    }
    return array;
};





/* ==================== MODIFY ==================== */

// for arrays of string and number
Array.prototype.removeItem = function (item) {
    var itemIndex = this.indexOf(item);
    if (itemIndex > -1) {
        this.splice(itemIndex, 1);
    }
    return itemIndex;
};

Array.prototype.removeItemByIndex = function (index) {
    return this.splice(index, 1);
};





/* ==================== ACCESS ==================== */

// requires Array.randomItems()
Array.prototype.randomItem = function () {
    var items = this.getRandomItems(1);
    if (items.length) {
        return items[0];
    }
    return null;
};

/* requires:
        Array.subarray()
        Array.lastIndex()
        Array.removeItemByIndex()
        Number.round()
*/
Array.prototype.randomItems = function (count) {
    var count = count || 0;
    var items = [];
    var array = this.subarray();
    if (this.length >= count) {
        for (var i = 0; i < count; i++) {
            var index = Math.random(array.lastIndex()).round();
            items.push( array[index] );
            array.removeItemByIndex(index);
        }
    }
    return items;
};

Array.prototype.lastItem = function (item) {
    return this[this.lastIndex];
};

Array.prototype.lastIndex = function (item) {
    return this.length - 1;
};





/* ==================== MATH ==================== */

// requires Number.isFloat() and Number.round()
Array.prototype.round = function () {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (Number.isFloat(item)) {
            item = item.round();
        }
        result.push(item);
    }
    return result;
};

Array.prototype.sum = function () {
    return this.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    });
};

Array.prototype.average = function () {
    return this.sum() / this.length;
};

Array.prototype.min = function () {
    return Math.min.apply(null, this);
};

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

// requires Number.isNumeric()
Array.prototype.mult = function (factor) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (Number.isNumeric(item)) {
            item *= factor;
        }
        result.push(item);
    }
    return result;
};
