var TimedIf = function (condition, callback, interval, maxAttempts) {
    return new TimedIf.prototype.init(condition, callback, interval, maxAttempts);
}

TimedIf.prototype.init = function (condition, callback, interval, maxAttempts) {
    
    this.condition   = condition;
    this.callback    = callback;
    this.interval    = interval;
    this.attempts    = 0;
    this.maxAttempts = maxAttempts;
    
    var self = this;
    
    this.handler = setInterval(function () {
        
        if (self.condition()) {
            self.callback();
            clearInterval(self.handler);
        }
        
        if (self.attempts >= self.maxAttempts) {
            clearInterval(self.handler);
        }
        
        self.attempts++;
        
    }, this.interval);
    
};

TimedIf.prototype.init.prototype = TimedIf.prototype;