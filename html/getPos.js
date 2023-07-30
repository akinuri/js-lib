function getAbsPos(element) {
    let top  = 0;
    let left = 0;
    do {
        top  += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);
    return { top, left };
}

function getRelPos(child, parent) {
    let parentAbsPos = getAbsPos(parent || child.parentElement);
    let childAbsPos  = getAbsPos(child);
    let top  = childAbsPos.top - parentAbsPos.top;
    let left = childAbsPos.left - parentAbsPos.left;
    return { top, left };
}