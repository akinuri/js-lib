function dash2camelCase(str) {
    var words = str.split("-");
    if (words.length > 1) {
        var camelCase = words.slice(1).map(function (word) {
            return word[0].toUpperCase() + word.slice(1);
        });
        return words[0] + camelCase.join("");
    }
    return words[0];
}

HTMLElement.prototype.styles = function (prop, value) {
    if (prop) {
        if (value) {
            this.style[dash2camelCase(prop)] = value;
        }
        return getComputedStyle(this)[prop];
    }
    return null;
};



(function () {
    console.warn("HTMLElement.prototype has been extended with a method: toggleClass(classname1 [, className2])");
    HTMLElement.prototype.toggleClass = function (className1, className2) {
        if (className1) {
            if (className2) {
                if (this.classList.contains(className1)) {
                    this.classList.remove(className1);
                    if (!this.classList.contains(className2)) {
                        this.classList.add(className2);
                    }
                } else {
                    this.classList.add(className1);
                    if (this.classList.contains(className2)) {
                        this.classList.remove(className2);
                    }
                }
            } else {
                if (this.classList.contains(className1)) {
                    this.classList.remove(className1);
                } else {
                    this.classList.add(className1);
                }
            }
        }
    };
})();



function textQuery(elem, text, type, escape) {
    var type    = type || "equals";
    var nodes   = elem.querySelectorAll("*");
    var matches = [];
    for (var i = 0; i < nodes.length; i++) {
        if (type == "equals" && nodes[i].innerText == text) {
            matches.push(nodes[i]);
        } else if (type == "contains" && nodes[i].innerText && nodes[i].innerText.includes(text)) {
            matches.push(nodes[i]);
        }
    }
    if (escape) {
        return matches;
    }
    var result = [];
    for (var i = 0; i < matches.length; i++) {
        var filter = textQuery(matches[i], text, type, true);
        if (filter.length == 0) {
            result.push(matches[i]);
        }
    }
    return result;
}

HTMLElement.prototype.getElementsByInnerText = function (text, escape) {
    return textQuery(this, text, "equals", escape);
};
document.getElementsByInnerText = HTMLElement.prototype.getElementsByInnerText;

HTMLElement.prototype.getElementByInnerText = function (text) {
    var result = this.getElementsByInnerText(text);
    if (result.length == 0)
        return null;
    return result[0];
}
document.getElementByInnerText = HTMLElement.prototype.getElementByInnerText;

HTMLElement.prototype.getElementsContainText = function (text, escape) {
    return textQuery(this, text, "contains", escape);
};
document.getElementsContainText = HTMLElement.prototype.getElementsContainText;

HTMLElement.prototype.getElementContainsText = function (text, escape) {
    var result = this.getElementsContainText(text);
    if (result.length == 0)
        return null;
    return result[0];
};
document.getElementContainsText = HTMLElement.prototype.getElementContainsText;
