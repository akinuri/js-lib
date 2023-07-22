function Frequency() {
    let input = null;
    if (arguments.length == 1 && arguments[0] instanceof Array) {
        input = arguments[0];
    } else {
        input = Array.from(arguments);
    }
	for (let i = 0; i < input.length; i++) {
		if (this[input[i]]) {
			this[input[i]]++;
		} else {
			this[input[i]] = 1;
		}
	}
}

Frequency.prototype.getItemsByFrequency = function (frequency) {
    let items = [];
    for (let item in this) {
        if (this[item] == frequency) {
            items.push( parseInt(item, 10) );
        }
    }
    return items;
};

Frequency.prototype.getMaxFrequency = function () {
    return Math.max.apply(null, Object.values(this));
};