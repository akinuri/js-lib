var ToolTip = function (source, tip, className) {
    return new ToolTip.prototype.init(source, tip, className);
};

ToolTip.prototype.init = function (source, tip, className) {
    
    this.source = {
        elem : source,
        x : 0,
        y : null,
        w : null,
        h : null,
        required : false,
    };
    this.getSourceInfo();
    this.source.elem.tooltip = this;
    if (this.source.elem.getAttribute("required") != null) {
        this.source.required = true;
    }
    
    this.target = {
        elem     : null,
        x        : 0,
        y        : null,
        w        : null,
        h        : null,
        tip      : null,
        visible  : false,
        hovering : false,
    };
    this.createTarget();
    
    if (typeof tip != "undefined") {
        this.updateTip(tip);
    } else {
        this.getTip(tip);
    }
    
    this.getTargetInfo();
    
    if (typeof className != "undefined" && className != "") {
        this.target.elem.classList.add(className);
    }
    
    this.cursor = {
        type   : null,
        size   : null,
        margin : 2,
    };
    this.detectCursorSize();
    
    this.events = {
        delay        : 500,
        delayHandler : null,
        mouseenter   : null,
        click        : null,
        mousemove    : null,
        mouseleave   : null,
    };
    
    this.addEventListeners();
};

ToolTip.prototype.getSourceInfo = function () {
    this.source.x = this.source.elem.offsetLeft;
    this.source.y = this.source.elem.offsetTop;
    this.source.w = parseInt(getComputedStyle(this.source.elem).width, 10);
    this.source.h = parseInt(getComputedStyle(this.source.elem).height, 10);
};

ToolTip.prototype.createTarget = function () {
    this.target.elem = document.createElement("div");
    this.target.elem.className = "tooltip";
};

ToolTip.prototype.getTargetInfo = function () {
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

ToolTip.prototype.getTip = function () {
    if (this.source.elem.title) {
        this.target.tip = this.target.elem.innerText = this.source.elem.title;
        this.source.elem.removeAttribute("title");
    }
};

ToolTip.prototype.updateTip = function (tip) {
    this.target.tip = this.target.elem.innerText = tip;
};

ToolTip.prototype.detectCursorSize = function () {
    this.cursor.type = getComputedStyle(this.source.elem).cursor;
    switch (this.cursor.type) {
        case "default":
            this.cursor.size = 19;
            break;
        case "text":
            this.cursor.size = 10;
            break;
        case "pointer":
            this.cursor.size = 25;
            break;
    };
    this.cursor.size *= 1 / devicePixelRatio;
    this.cursor.size += this.cursor.margin * (1 / devicePixelRatio);
};

ToolTip.prototype.addEventListeners = function () {
    var self = this;
    
    this.events.mousemove = function (e) {
        self.target.x = e.pageX;
        self.target.y = e.pageY + self.cursor.size;
    };
    
    this.events.mouseenter = function () {
        self.target.hovering = true;
        if (self.source.required) {
            self.source.elem.removeAttribute("required");
        }
        self.source.elem.addEventListener("mousemove",  self.events.mousemove);
        self.source.elem.addEventListener("click", self.events.click);
        self.events.delayHandler = setTimeout(function () {
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
        clearTimeout(self.events.delayHandler);
        self.source.elem.removeEventListener("click", self.events.click);
        self.target.hovering = false;
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

ToolTip.prototype.show = function (position) {
    var self = this;
    if (!this.target.hovering && position) {
        var offset = 0;
        setTimeout(function () {
            if (["top", "bottom"].includes(position)) {
                if (self.source.w > self.target.w) {
                    offset = Math.floor((self.source.w - self.target.w) / 2);
                } else {
                    offset = Math.floor((self.target.w - self.source.w) / 2);
                }
            } else if (["left", "right"].includes(position)) {
                if (self.source.h > self.target.h) {
                    offset = Math.floor((self.source.h - self.target.h) / 2);
                } else {
                    offset = Math.floor((self.target.h - self.source.h) / 2);
                }
            }
            switch (position) {
                case "top":
                    self.target.elem.style.left = self.source.x + offset + "px";
                    self.target.elem.style.top  = self.source.y - self.target.h - self.cursor.margin + "px";
                    break;
                case "right":
                    self.target.elem.style.left = self.source.x + self.source.w + self.cursor.margin + "px";
                    self.target.elem.style.top  = self.source.y + offset + "px";
                    break;
                case "bottom":
                    self.target.elem.style.left = self.source.x + offset + "px";
                    self.target.elem.style.top  = self.source.y + self.source.h + self.cursor.margin + "px";
                    break;
                case "left":
                    self.target.elem.style.left = self.source.x - self.target.w - self.cursor.margin + "px";
                    self.target.elem.style.top  = self.source.y + offset + "px";
                    break;
            }
            self.target.x = self.target.elem.offsetLeft;
            self.target.y = self.target.elem.offsetTop;
        }, 1);
    }
    if (this.target.elem.parentElement == null) {
        document.body.appendChild(this.target.elem);
        this.target.visible = true;
        setTimeout(function () {
            self.target.elem.classList.add("visible");
        }, 1);
    }
    return this;
};

ToolTip.prototype.hide = function () {
    var self = this;
    this.target.elem.classList.add("disappear");
    this.target.visible = false;
    setTimeout(function () {
        self.target.elem.remove();
        self.target.elem.classList.remove("disappear");
    }, 250);
};

ToolTip.prototype.destroy = function (delay) {
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

ToolTip.prototype.init.prototype = ToolTip.prototype;
