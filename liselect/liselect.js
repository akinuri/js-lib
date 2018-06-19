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

// ============================== LISELECT OBJECT

function Liselect(list) {
    this.container = null;
    
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
    
    this.transform(list);
    
    this.registerEvents();
    
    this.keys = {
        // stupid edge(ie) going its own way again
        all  : ["ArrowUp", "ArrowDown", "Up", "Down"],
        up   : ["ArrowUp", "Up"],
        down : ["ArrowDown", "Down"],
    };
    
    this.isOpen = false;
}

// ============================== RESTRUCTURE

Liselect.prototype.transform = function (list) {
    var parent    = list.parentElement;
    var refElem   = list.nextElementSibling;
    
    var container   = elem("div", {"class":"li-select-container"});
    var arrow       = elem("span", {"class":"arrow"}, "&#9660;", true);
    var placeholder = elem("li", {"class":"placeholder"}, list.dataset.placeholder);
    var input       = elem("input", {"type":"text", "readonly":"", "placeholder":placeholder.innerText});
    
    input.setAttribute("title", list.title);
    list.removeAttribute("title");
    list.removeAttribute("data-name");
    list.removeAttribute("data-placeholder");
    list.insertBefore(placeholder, list.children[0]);
    container.appendChild(input);
    container.appendChild(arrow);
    container.appendChild(list);
    parent.insertBefore(container, refElem);
    
    this.container = container;
    this.input     = input;
    this.arrow     = arrow;
    this.list      = list;
    this.options   = Array.from(list.children);
    
    container.liselect = this;
};

// ============================== INTERACTION EVENTS

Liselect.prototype.registerEvents = function (list) {
    var self = this;
    
    $(this.input).on("click", function () {
        self.toggleState();
    });
    $(this.arrow).on("click", function () {
        $(self.input).trigger("focus");
        $(self.input).trigger("click");
    });
    
    $(this.container).on("mouseenter", "li", function () {
        self.hover(this.getIndex());
    });
    
    $(this.container).on("click", "li", function () {
        self.select(this);
    });
    
    $(this.list).on("mouseleave", function () {
        self.unhover();
        self.hover();
    });
    
    $(this.input).on("focus", function (e) {
        self.keyCapture = function (e) {
            var key = e.key;
            if (self.keys.all.includes(key)) {
                if (!self.isOpen) {
                    self.open();
                    return;
                }
            }
            var index = self.hovered.index;
            if (self.keys.up.includes(key)) {
                index--;
            } else if (self.keys.down.includes(key)) {
                index++;
            } else if (key == "Enter") {
                self.select(self.options[index]);
                return;
            }
            index = index.loop(0, self.options.length);
            self.hover(index);
        };
        window.addEventListener("keydown", self.keyCapture);
    });
    
    $(this.input).on("blur", function (e) {
        setTimeout(function () {
            self.close();
            window.removeEventListener("keydown", self.keyCapture);
        }, 200);
    });
};

// ============================== OBJECT ACTIONS

Liselect.prototype.toggleState = function (list) {
    if (this.container.classList.contains("visible")) {
        this.close();
    } else {
        this.open();
    }
};

Liselect.prototype.open = function (list) {
    this.container.classList.add("visible");
    this.isOpen = true;
    this.hover();
};

Liselect.prototype.close = function (list) {
    this.container.classList.remove("visible");
    this.isOpen = false;
    this.unhover();
};

Liselect.prototype.hover = function (index) {
    this.unhover();
    if (typeof index != "undefined") {
        this.options[index].classList.add("hover");
        this.hovered.index = index;
    } else {
        this.options[this.selected.index].classList.add("hover");
        this.hovered.index = this.selected.index;
    }
};

Liselect.prototype.unhover = function () {
    this.options.forEach(function (option) {
        option.classList.remove("hover");
        if (option.classList.length == 0) {
            option.removeAttribute("class");
        }
    });
    this.hovered.index = 0;
};

Liselect.prototype.select = function (li) {
    this.unhover();
    
    this.selected.index = li.getIndex();
    this.selected.value = li.dataset.value || "";
    this.selected.text  = li.innerText;
    
    if (!li.classList.contains("placeholder")) {
        this.input.value = this.selected.text;
    } else {
        this.input.value = "";
    }
    
    this.close();
};
