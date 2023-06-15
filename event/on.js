function ondomload(callback = null) {
    if (callback) {
        window.addEventListener("DOMContentLoaded", function (e) {
            callback.call(this, e);
        });
    }
}

function onwindowload(callback = null) {
    if (callback) {
        window.addEventListener("load", function (e) {
            callback.call(this, e);
        });
    }
}