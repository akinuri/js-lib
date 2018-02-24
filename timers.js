window.setInterval = function (window, setInterval) {
    if (!window.timers) {
        window.timers = {};
    }
    if (!window.timers.intervals) {
        window.timers.intervals = {};
    }
    if (!window.timers.intervals.active) {
        window.timers.intervals.active = {};
    }
    return function (func, interval) {
        var id = setInterval(func, interval);
        window.timers.intervals.active[id] = func;
        return id;
    }
}(window, window.setInterval);


window.clearInterval = function (window, clearInterval) {
    if (!window.timers) {
        window.timers = {};
    }
    if (!window.timers.intervals) {
        window.timers.intervals = {};
    }
    if (!window.timers.intervals.inactive) {
        window.timers.intervals.inactive = {};
    }
    return function (id) {
        if (window.timers.intervals.active && window.timers.intervals.active[id]) {
            window.timers.intervals.inactive[id] = window.timers.intervals.active[id];
            clearInterval(id);
            delete window.timers.intervals.active[id];
        }
    }
}(window, window.clearInterval);