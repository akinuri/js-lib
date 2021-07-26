var Tooltip = function (source, tip, position) {
    return new Tooltip.prototype.init(source, tip, position);
};

Tooltip.prototype.init = function (source, tip, position) {
    
    this.source = {
        elem : source,
        x : 0,
        y : null,
        w : null,
        h : null,
        required : false,
        hovering : false,
    };
    this.updateSourceInfo();
    this.source.elem.tooltip = this;
    if (this.source.elem.getAttribute("required") != null) {
        this.source.required = true;
    }
    
    this.hideHandle = null;
    
    this.target = {
        elem     : null,
        x        : null,
        y        : null,
        w        : null,
        h        : null,
        tip      : null,
        visible  : false,
        position : "auto",
        margin   : 2,
    };
    this.createTarget();
    if (typeof tip != "undefined" && tip) {
        this.updateTip(tip);
    } else {
        this.getTipFromTitle(tip);
    }
    this.updateTargetSize();
        
    this.events = {
        mouseenter : null,
        mouseleave : null,
    };
    
    var positions = ["top", "right", "bottom", "left"];
    if (typeof position != "undefined" && positions.includes(position)) {
        
        this.target.position = position;
        this.calcTargetPos();
        
        this.addEventListenersBasic();
        
    } else {
        
        this.cursor = {
            type   : null,
            size   : null,
            margin : 2,
        };
        this.detectCursorSize();
        
        this.events.delay       = 500;
        this.events.delayHandle = null;
        this.events.click       = null;
        this.events.mousemove   = null;
        
        this.addEventListenersAdv();
    }
};

// https://stackoverflow.com/a/1480137/2202732
function getAbsPos(element) {
    var top = 0, left = 0;
    do {
        top  += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);
    return { top, left };
}

Tooltip.prototype.updateSourceInfo = function () {
    var pos = getAbsPos(this.source.elem);
    this.source.x = pos.left;
    this.source.y = pos.top;
    this.source.w = parseInt(getComputedStyle(this.source.elem).width, 10);
    this.source.h = parseInt(getComputedStyle(this.source.elem).height, 10);
};

Tooltip.prototype.createTarget = function () {
    this.target.elem = document.createElement("div");
    this.target.elem.className = "tooltip";
};

Tooltip.prototype.updateTargetSize = async function () {
    var self = this;
    var clone = this.target.elem.cloneNode(true);
    clone.classList.add("dummy");
    document.body.appendChild(clone);
    setTimeout(function () {
        self.target.w = clone.offsetWidth;
        self.target.h = clone.offsetHeight;
        clone.remove();
    }, 1);
};

Tooltip.prototype.getTipFromTitle = function () {
    if (this.source.elem.title) {
        this.updateTip(this.source.elem.title);
        this.source.elem.removeAttribute("title");
    }
};

Tooltip.prototype.updateTip = function (tip) {
    this.target.tip = this.target.elem.innerText = tip;
};

Tooltip.prototype.detectCursorSize = function () {
    this.cursor.type = getComputedStyle(this.source.elem).cursor;
    switch (this.cursor.type) {
        case "default":
            this.cursor.size = 19;
            break;
        case "pointer":
            this.cursor.size = 25;
            break;
        default:
            this.cursor.size = 10; // text
    };
    this.cursor.size *= 1 / devicePixelRatio;
    this.cursor.size += this.cursor.margin * (1 / devicePixelRatio);
};

Tooltip.prototype.addEventListenersBasic = function () {
    var self = this;
    
    this.events.mouseenter = function () {
        self.source.hovering = true;
        if (self.source.required) {
            self.source.elem.removeAttribute("required");
        }
        self.show();
    };
    
    this.events.mouseleave = function () {
        self.source.hovering = false;
        if (self.source.required) {
            self.source.elem.setAttribute("required", "");
        }
        self.hide();
    };
    
    this.source.elem.addEventListener("mouseenter", this.events.mouseenter);
    this.source.elem.addEventListener("mouseleave", this.events.mouseleave);
};

Tooltip.prototype.addEventListenersAdv = function () {
    var self = this;
    
    this.events.mousemove = function (e) {
        self.target.x = e.pageX;
        self.target.y = e.pageY + self.cursor.size;
    };
    
    this.events.mouseenter = function () {
        self.source.hovering = true;
        if (self.source.required) {
            self.source.elem.removeAttribute("required");
        }
        self.source.elem.addEventListener("mousemove",  self.events.mousemove);
        self.source.elem.addEventListener("click", self.events.click);
        self.events.delayHandle = setTimeout(function () {
            self.source.elem.removeEventListener("mousemove", self.events.mousemove);
            self.target.elem.style.left = self.target.x + "px";
            self.target.elem.style.top  = self.target.y + "px";
            self.show();
        }, self.events.delay);
    };
    
    this.events.mouseleave = function () {
        if (self.source.required) {
            self.source.elem.setAttribute("required", "");
        }
        clearTimeout(self.events.delayHandle);
        self.source.elem.removeEventListener("click", self.events.click);
        self.source.hovering = false;
        self.hide();
    };
    
    this.events.click = function () {
        if (self.target.visible) {
            self.hide();
        }
    };
    
    this.source.elem.addEventListener("mouseenter", this.events.mouseenter);
    this.source.elem.addEventListener("mouseleave", this.events.mouseleave);
};

Tooltip.prototype.deleteEventListeners = function () {
    this.source.elem.removeEventListener("click", this.events.click);
    this.source.elem.removeEventListener("mousemove", this.events.mousemove);
    this.source.elem.removeEventListener("mouseenter", this.events.mouseenter);
    this.source.elem.removeEventListener("mouseleave", this.events.mouseleave);
}

Tooltip.prototype.calcTargetPos = function () {
    
    var self   = this;
    var offset = 0;
    var x = y = 0;
    
    setTimeout(function () {
        
        if (["top", "bottom"].includes(self.target.position)) {
            offset = Math.floor((self.source.w - self.target.w) / 2);
        } else if (["left", "right"].includes(self.target.position)) {
            offset = Math.floor((self.source.h - self.target.h) / 2);
        }
        
        switch (self.target.position) {
            case "top":
                x = self.source.x + offset;
                y = self.source.y - self.target.h - self.target.margin;
                break;
            case "right":
                x = self.source.x + self.source.w + self.target.margin;
                y = self.source.y + offset;
                break;
            case "bottom":
                x = self.source.x + offset;
                y = self.source.y + self.source.h + self.target.margin;
                break;
            case "left":
                x = self.source.x - self.target.w - self.target.margin;
                y = self.source.y + offset;
                break;
        }
        
        self.target.x = x;
        self.target.y = y;
        self.target.elem.style.left = x + "px";
        self.target.elem.style.top  = y + "px";
        
    }, 1);
    
};

Tooltip.prototype.show = function () {
    if (this.hideHandle != null) {
        clearTimeout(this.hideHandle);
        this._hide();
    }
    if (this.target.elem.parentElement == null) {
        this.target.visible = true;
        document.body.appendChild(this.target.elem);
        var self = this;
        setTimeout(function () {
            self.target.elem.classList.add("visible");
        }, 1);
    }
    return this;
};

Tooltip.prototype.hide = function () {
    this.target.visible = false;
    this.target.elem.classList.remove("visible");
    var self = this;
    this.hideHandle = setTimeout(function () {
        self._hide();
    }, 250);
};

Tooltip.prototype._hide = function () {
    this.target.elem.remove();
    this.hideHandle = null;
};

Tooltip.prototype.destroy = function (delay) {
    var delay = delay || 10;
    var self = this;
    setTimeout(function () {
        self.hide();
        self.target.elem.remove();
        self.source.elem.tooltip = null;
        self.source.elem.removeEventListener("mouseenter", self.events.mouseenter);
        self.source.elem.removeEventListener("mouseleave", self.events.mouseleave);
        self.source.elem.removeEventListener("mousemove", self.events.mousemove);
    }, delay);
    return this;
};

Tooltip.prototype.init.prototype = Tooltip.prototype;
