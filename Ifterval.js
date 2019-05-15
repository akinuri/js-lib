var Ifterval = function (condition, callback, interval, maxAttempts) {
    return new Ifterval.prototype.init(condition, callback, interval, maxAttempts);
}

Ifterval.prototype.init = function (condition, callback, interval, maxAttempts) {
    
    this.condition   = condition;
    this.callback    = callback;
    this.interval    = interval;
    this.attempts    = 0;
    this.maxAttempts = maxAttempts;
    
    var self = this;
    
    this.handler = setInterval(function () {
        
        self.attempts++;
        
        if (self.condition()) {
            self.callback();
            clearInterval(self.handler);
            self.handler = null;
        }
        
        if (self.attempts >= self.maxAttempts) {
            clearInterval(self.handler);
            self.handler = null;
        }
        
    }, this.interval);
    
};

Ifterval.prototype.init.prototype = Ifterval.prototype;

/* 
// demo
Ifterval(function () {
    console.log("checking");
    if (a == 2) return true;
    return false;
}, function () {
    console.log("finally");
}, 500, 20);
 */