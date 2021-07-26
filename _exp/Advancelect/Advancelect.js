// ============================== HELPER FUNCTIONS

HTMLElement.prototype.getIndex = function () {
    if (this.parentElement) {
        return Array.from(this.parentElement.children).indexOf(this);
    }
    return -1;
};

Number.prototype.loop = function loop(min, max) {
    var num = this % max;
    if (num < min) {
        num += max;
    }
    return num;
};

// ============================== ADVANCELECT OBJECT

function Advancelect(select) {
    this.components = {};
    
    this.selected = {
        index : 0,
        value : null,
        text  : null,
    };
    
    this.hovered = {
        index : 0,
        value : null,
        text  : null,
    };
    
    this.events = {
        keys : {
            // stupid edge(ie) going its own way again
            all  : ["ArrowUp", "ArrowDown", "Up", "Down", "Enter"],
            dir  : ["ArrowUp", "ArrowDown", "Up", "Down"],
            up   : ["ArrowUp", "Up"],
            down : ["ArrowDown", "Down"],
        }
    };
    
    this.transform(select);
    
    this.registerEvents();
    
    this.isOpen = false;
}

// ============================== TRANSFORM

Advancelect.prototype.transform = function (select) {
    
    this.components = {
        container   : elem("div", {"class":"advanced-select"}),
        input       : null,
        arrow       : elem("span", {"class":"arrow"}, "&#9660;", true),
        list        : elem("ul"),
    };
    this.options = null;
    
    var placeholderli = null;
    
    if (typeof select.dataset.placeholder != "undefined") {
        this.components.input = elem("input", {"type":"text", "readonly":"", "placeholder":select.dataset.placeholder});
        placeholderli = elem("li", {"class":"placeholder"}, select.dataset.placeholder);
    } else {
        this.components.input = elem("input", {"type":"text", "readonly":"", "placeholder":select.children[0].innerText});
    }
    
    if (select.title) {
        this.components.input.setAttribute("title", select.title);
    }
    if (select.required) {
        this.components.input.required = true;
    }
    if (select.name) {
        this.components.input.setAttribute("name", select.name);
    }
    if (select.id) {
        this.components.container.setAttribute("id", select.id);
    }
    
    for (var i = 0; i < select.options.length; i++) {
        var opt = select.options[i];
        if (opt.value == opt.text) {
            var li  = elem("li", null, opt.text, true);
        } else {
            var li  = elem("li", {"data-value":opt.value}, opt.text, true);
        }
        this.components.list.appendChild(li);
    }
    
    if (placeholderli) {
        this.components.list.insertBefore(placeholderli, this.components.list.children[0]);
    }
    this.options = Array.from(this.components.list.children);
    this.components.container.appendChild(this.components.input);
    this.components.container.appendChild(this.components.arrow);
    this.components.container.appendChild(this.components.list);
    select.parentElement.insertBefore(this.components.container, select.nextElementSibling);
    select.remove();
    this.components.input.advancelect = this;
};

// ============================== INTERACTION EVENTS

Advancelect.prototype.registerEvents = function (list) {
    var self = this;
    
    $(this.components.input).on("click", function () {
        self.toggleState();
    });
    $(this.components.arrow).on("click", function () {
        self.focus();
        $(self.input).trigger("click");
    });
    
    $(this.components.container).on("mouseenter", "li", function () {
        self.hover(this.getIndex());
    });
    
    $(this.components.container).on("click", "li", function () {
        self.select(this.getIndex());
    });
    
    $(this.components.list).on("mouseleave", function () {
        self.unhover();
        self.hover();
    });
    
    self.events.keyCapture = function (e) {
        var key = e.key;
        if (self.events.keys.all.includes(key)) {
            e.preventDefault();
            if (!self.isOpen) {
                self.open();
                return;
            }
            var index = self.hovered.index;
            if (self.events.keys.up.includes(key)) {
                index--;
            } else if (self.events.keys.down.includes(key)) {
                index++;
            } else if (key == "Enter") {
                self.select(index);
                e.preventDefault();
                return;
            }
            index = index.loop(0, self.options.length);
            self.hover(index);
        }
    };
    
    $(this.components.input).on("focus", function (e) {
        window.addEventListener("keydown", self.events.keyCapture);
    });
    
    $(this.components.input).on("blur", function (e) {
        setTimeout(function () {
            self.close();
            window.removeEventListener("keydown", self.events.keyCapture);
        }, 200);
    });
};

// ============================== ADVANCELECT ACTIONS

Advancelect.prototype.toggleState = function (list) {
    if (this.components.container.classList.contains("visible")) {
        this.close();
    } else {
        this.open();
    }
};

Advancelect.prototype.focus = function () {
    $(this.components.input).trigger("focus");
};

Advancelect.prototype.open = function (list) {
    this.components.container.classList.add("visible");
    this.isOpen = true;
    this.hover();
};

Advancelect.prototype.close = function (list) {
    this.components.container.classList.remove("visible");
    this.isOpen = false;
    this.unhover();
};

Advancelect.prototype.hover = function (index) {
    this.unhover();
    if (typeof index != "undefined") {
        this.options[index].classList.add("hover");
        this.hovered.index = index;
    } else {
        this.options[this.selected.index].classList.add("hover");
        this.hovered.index = this.selected.index;
    }
};

Advancelect.prototype.unhover = function () {
    this.options.forEach(function (option) {
        option.classList.remove("hover");
        if (option.classList.length == 0) {
            option.removeAttribute("class");
        }
    });
    this.hovered.index = 0;
};

Advancelect.prototype.select = function (index) {
    this.unhover();
    var li = this.options[index];
    this.selected.index = li.getIndex();
    this.selected.value = li.dataset.value || "";
    this.selected.text  = li.innerText;
    if (!li.classList.contains("placeholder")) {
        this.components.input.value = this.selected.text;
    } else {
        this.components.input.value = "";
    }
    this.close();
    this.focus();
};

Advancelect.prototype.required = function () {
    if (this.components.input.required != null && this.components.input.value == "") {
        return true;
    }
    return false;
};
