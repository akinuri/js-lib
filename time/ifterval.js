/**
 * Allows one to perform an action in a chaotic (in regard to time) system.
 */
class Ifterval {
    
    condition   = null;
    action      = null;
    interval    = 100;
    attempts    = 0;
    maxAttempts = 2;
    conditionMetAt = null;
    
    timerHandle = null;
    
    constructor(
        conditionCallback,
        actionCallback,
        maxAttempts = 2,
        interval = 100,
    ) {
        this.condition   = conditionCallback;
        this.action      = actionCallback;
        this.interval    = interval;
        this.maxAttempts = maxAttempts;
        
        var self = this;
        
        this.timerHandle = setInterval(function () {
            
            if (self.condition()) {
                self.conditionMetAt = new Date().valueOf();
                self.action.call(this);
                clearInterval(self.timerHandle);
                self.timerHandle = null;
            }
            
            self.attempts++;
            
            if (self.attempts >= self.maxAttempts && self.timerHandle) {
                clearInterval(self.timerHandle);
                self.timerHandle = null;
            }
            
        }, this.interval);
    }
    
}