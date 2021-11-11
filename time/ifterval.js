/**
 * Allows one to perform an action in a chaotic (in regard to time) system.
 */
class Ifterval {
    
    condition   = null;
    action      = null;
    interval    = null;
    attempts    = 0;
    maxAttempts = null;
    
    timerHandle = null;
    
    constructor(
        conditionCallback,
        actionCallback,
        interval,
        maxAttempts,
    ) {
        this.condition   = conditionCallback;
        this.action      = actionCallback;
        this.interval    = interval;
        this.maxAttempts = maxAttempts;
        
        var self = this;
        
        this.timerHandle = setInterval(function () {
            
            self.attempts++;
            
            if (self.condition()) {
                self.action();
                clearInterval(self.timerHandle);
                self.timerHandle = null;
            }
            
            if (self.attempts >= self.maxAttempts) {
                clearInterval(self.timerHandle);
                self.timerHandle = null;
            }
            
        }, this.interval);
    }
    
}