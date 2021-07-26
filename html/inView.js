function inView(el) {
    var rect = el.getBoundingClientRect();
    var el = {
        top    : rect.top + scrollY,
        bottom : rect.top + scrollY + rect.height,
        height : rect.height,
    };
    var view = {
        top    : scrollY,
        bottom : scrollY + innerHeight,
    };
    var result = {
        visible : "none",
        amount  : 0,
    };
    if (el.top < view.bottom && el.top > view.top) {
        if (el.bottom < view.bottom) {
            result.visible = "all";
            result.amount = 1;
        } else {
            result.visible = "top";
            result.amount = (view.bottom - el.top) / el.height;
        }
    }
    else if (el.bottom > view.top && el.top < view.bottom) {
        if (el.top > view.top) {
            result.visible = "all";
            result.amount = 1;
        } else {
            result.visible = "bottom";
            result.amount = (el.bottom - view.top) / el.height;
        }
    }
    return result;
}