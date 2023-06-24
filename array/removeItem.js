// for scalar values?
function removeItem(array, item) {
    let itemIndex = array.indexOf(item);
    if (itemIndex > -1) {
        array.splice(itemIndex, 1);
    }
    return itemIndex;
}