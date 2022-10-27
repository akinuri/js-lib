function getPrototypeChain(obj, nameOnly=false) {
    let bag = [];
    if (!getPrototypeChain.hasOwnProperty("chainIterator")) {
        getPrototypeChain.chainIterator = function (obj, bag, nameOnly=false) {
            let pt = Object.getPrototypeOf(obj);
            if (pt != null) {
                if (nameOnly) {
                    bag.push(pt.constructor.name);
                } else {
                    bag.push(pt);
                }
                getPrototypeChain.chainIterator(pt, bag, nameOnly);
            }
        };
    }
    getPrototypeChain.chainIterator(obj, bag, nameOnly);
    return bag;
}