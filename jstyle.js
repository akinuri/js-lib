function TAB(count) {
    var count = count || 1;
    return "\t".repeat(count);
}

function EOL(count, cr) {
    var count = count || 1;
    var eol = "\n";
    if (cr) {
        eol = "\r" + eol;
    }
    return "\n".repeat(count);
}

var jstyle = {
    element : null,
    init : function initialize() {
        if (!this.element) {
            this.element = document.createElement("style");
            this.element.id = "injectedStyles";
            document.head.appendChild(this.element);
        }
    },
    prepRule : function addRule(selector, rules, indent) {
        var indent = indent || 1;
        var cssText = EOL() + TAB(indent) + selector + " {";
        var rules_temp = [];
        for (var prop in rules) {
            var rule = EOL() + TAB(indent + 1) + prop + ": " + rules[prop] + ";";
            rules_temp.push(rule);
        }
        cssText += rules_temp.join(" ");
        cssText += EOL() + TAB(indent) + "}";
        return cssText;
    },
    appendRule : function (cssText) {
        this.element.appendChild( document.createTextNode(cssText) );
    },
    addRule : function (selector, rules, indent) {
        this.init();
        this.appendRule( this.prepRule(selector, rules, indent) );
    },
    addRules : function addRules(rulesObj) {
        for (var selector in rulesObj) {
            var rules = rulesObj[selector];
            jstyle.addRule(selector, rules);
        }
    },
    addMedia : function () {
        var condText  = null;
        var selectors = null;
        var selector  = null;
        var rules     = null;
        var indent    = 1;
        var cssText   = EOL() + TAB() + "@media ";
        switch (arguments.length) {
            case 2:
                condText  = arguments[0];
                selectors = arguments[1];
                cssText += condText + " {";
                for (var selector in selectors) {
                    var rules = selectors[selector];
                    cssText += this.prepRule(selector, rules, (indent + 1));
                }
                break;
            case 3:
                condText = arguments[0];
                selector = arguments[1];
                rules    = arguments[2];
                cssText += condText + " {";
                cssText += this.prepRule(selector, rules, (indent + 1));
                break;
        }
        cssText += EOL() + TAB() + "}";
        this.appendRule(cssText);
    },
};

/* 
jstyle.addRule("body", {
    "background-color": "green",
});

jstyle.addRules({
    "body" : {
        "background-color": "red",
    },
    "p" : {
        "color": "yellow",
    },
});

jstyle.addMedia("screen and (max-width: 1200px)", "body", {
    "background-color": "orange",
});

jstyle.addMedia("screen and (max-width: 1200px)", {
    "body" : {
        "background-color": "purple",
    },
    "p" : {
        "color": "brown",
    },
});
 */
