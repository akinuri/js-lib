var jStyle = {
    element : null,
    init : function initialize() {
        if (!this.element) {
            this.element = document.createElement("style");
            this.element.id = "injectedStyles";
            document.head.appendChild(this.element);
        }
    },
    add : function addRule(selector, rules) {
        this.init();
        var cssText = "\r\n\t" + selector + " { ";
        var rules_temp = [];
        for (var prop in rules) {
            var rule = "\r\n\t\t" + prop + ": " + rules[prop] + ";";
            rules_temp.push(rule);
        }
        cssText += rules_temp.join(" ");
        cssText += "\r\n\t}\r\n";
        this.element.appendChild( document.createTextNode(cssText) );
    },
};

// jStyle.add("body", {
    // "background-color" : "pink",
    // "color" : "red",
// });