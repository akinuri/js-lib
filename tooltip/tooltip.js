function ToolTip(source, toolTipText) {
    this.source = source;
    this.source.tooltip = this;
    this.createElem();
    this.updateTip(toolTipText);
    this.hovering = false;
    
    this.events = {
        delay        : 500,
        delayHandler : null,
        mouseenter   : null,
        mousemove    : null,
        mouseleave   : null,
    };
    
    this.pos = {
        x : 0,
        y : 0,
    };
    
    this.cursor = {
        type   : null,
        size   : null,
        margin : 2,
    };
    this.detectCursorSize();
    
    this.addEventListeners();
}

ToolTip.prototype.detectCursorSize = function () {
    this.cursor.type = getComputedStyle(this.source).cursor;
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

ToolTip.prototype.createElem = function initToolTip() {
    this.elem = document.createElement("div");
    this.elem.className = "tooltip";
};

ToolTip.prototype.updateTip = function (toolTipText) {
    if (toolTipText) {
        this.elem.innerText = toolTipText;
    } else if (this.source.title) {
        this.elem.innerText = this.source.title;
    }
    this.source.removeAttribute("title");
};

ToolTip.prototype.addEventListeners = function () {
    var self = this;
    
    this.events.mousemove = function (e) {
        self.pos.x = e.pageX;
        self.pos.y = e.pageY + self.cursor.size;
    };
    
    this.events.mouseenter = function (e) {
        self.events.hovering = true;
        self.source.addEventListener("mousemove",  self.events.mousemove);
        self.events.delayHandler = setTimeout(function () {
            self.source.removeEventListener("mousemove", self.events.mousemove);
            self.elem.style.left = self.pos.x + "px";
            self.elem.style.top  = self.pos.y + "px";
            self.show();
        }, 500);
    };
    
    this.events.mouseleave = function (e) {
        clearTimeout(self.events.delayHandler);
        self.events.hovering = false;
        self.hide();
    };
    
    this.source.addEventListener("mouseenter", this.events.mouseenter);
    this.source.addEventListener("mouseleave", this.events.mouseleave);
};

ToolTip.prototype.show = function (position, margin) {
    var margin = margin || 5;
    if (this.elem.parentElement == null) {
        this.elem.classList.add("appear");
        document.body.appendChild(this.elem);
        var self = this;
        setTimeout(function () {
            self.elem.classList.remove("appear");
        }, 250);
    }
    if (!this.events.hovering && position) {
        switch (position) {
            case "top":
                this.elem.style.left = this.source.offsetLeft + "px";
                this.elem.style.top  = this.source.offsetTop - (parseInt(getComputedStyle(this.elem).height, 10) + margin) + "px";
                break;
            case "right":
                this.elem.style.left = this.source.offsetLeft + (parseInt(getComputedStyle(this.source).width, 10) + margin) + "px";
                this.elem.style.top  = this.source.offsetTop + "px";
                break;
            case "left":
                this.elem.style.left = this.source.offsetLeft - (parseInt(getComputedStyle(this.elem).width, 10) + margin) + "px";
                this.elem.style.top  = this.source.offsetTop + "px";
                break;
            case "bottom":
                var h = parseInt(getComputedStyle(this.source).height, 10);
                this.elem.style.left = this.source.offsetLeft + "px";
                this.elem.style.top  = this.source.offsetTop + h + margin +"px";
                break;
        }
    }
};

ToolTip.prototype.hide = function () {
    var self = this;
    this.elem.classList.add("disappear");
    setTimeout(function () {
        self.elem.remove();
        self.elem.classList.remove("disappear");
    }, 500);
};

ToolTip.init = function () {
    var all = document.querySelectorAll("[title]");
    all.forEach(function (elem) {
        new ToolTip(elem);
    });
};