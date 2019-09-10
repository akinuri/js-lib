function URLChangeListener(callback, interval) {
    this.previousURL     = null;
    this.currentURL      = null;
    this.callback        = callback || null;
    this.interval        = interval || 500;
    this.listenCount     = null;
    this.intervalHandle  = null;
    this.init();
}

URLChangeListener.prototype.init = function () {
    this.listenCount    = 0;
    this.intervalHandle = setInterval(this.listener.bind(this), this.interval);
};

URLChangeListener.prototype.listener = function () {
    this.listenCount++;
    
    this.currentURL = window.location.href;
    
    if (!this.previousURL) {
        this.previousURL = this.currentURL;
    }
    
    if (this.previousURL != this.currentURL) {
        
        // ideally, this line should be called right before the page/url changes
        // otherwise user can't access the both URLs while in the page (since they'll be the same)
        // I'm just nitpicking here :)
        this.previousURL = this.currentURL;
        
        if (this.callback) {
            this.callback.call(this);
        }
    }
};

URLChangeListener.prototype.destroy = function () {
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
    this.previousURL    = null;
    this.currentURL     = null;
    this.callback       = null;
    this.interval       = null;
    this.listenCount    = null;
};
