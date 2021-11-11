function Timer(type, callback, ms) {
    this.type     = type;
    this.callback = callback;
    this.ms       = ms;
    this.id       = null;
    this.active   = false;
}

Timer.prototype.start = function () {
    switch (this.type) {
        case "interval":
            this.id = setInterval(this.callback, this.ms);
            this.active = true;
            break;
        case "timeout":
            var self = this;
            this.id = setTimeout(function () {
                self.callback();
                self.active = false;
            }, this.ms);
            this.active = true;
            break;
    }
};

Timer.prototype.stop = function () {
    switch (this.type) {
        case "interval":
            clearInterval(this.id);
            this.id = null;
            this.active = false;
            break;
        case "timeout":
            clearTimeout(this.id);
            this.id = null;
            this.active = false;
            break;
    }
};