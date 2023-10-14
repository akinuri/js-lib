class XPath2 {
    
    static getElementPath(element, topParent = null) {
        let path = [];
        if (topParent) {
            if (typeof topParent == "string") {
                topParent = document.querySelector(topParent);
            } else if (parent instanceof HTMLElement) {
                topParent = parent;
            }
        }
        while (element) {
            path.unshift(element);
            if (topParent && topParent == element) {
                break;
            }
            element = element.parentElement;
        }
        return path;
    }

    static getElementXPathIdentifier(element) {
        let id = element.tagName.toLowerCase();
        if (element.parentElement) {
            let tagSiblings = element.parentElement.querySelectorAll(":scope > " + element.tagName);
            if (tagSiblings.length > 1) {
                let index = Array.from(tagSiblings).indexOf(element);
                id += "[" + (index + 1) + "]";
            }
        }
        return id;
    }
    
    static getElementXPath(element, topParent = null) {
        let xpath = [];
        let parents = XPath2.getElementPath(element, topParent);
        if (topParent) {
            parents.shift();
        }
        parents.forEach(parent => {
            xpath.push(XPath2.getElementXPathIdentifier(parent));
        });
        xpath = xpath.join("/");
        if (!topParent) {
            xpath = "/" + xpath;
        }
        return xpath;
    }
    
    static getElementByXPath(xpath, topParent = null) {
        if (topParent) {
            if (typeof topParent == "string") {
                topParent = document.querySelector(topParent);
            } else if (parent instanceof HTMLElement) {
                topParent = parent;
            }
        } else {
            topParent = document.documentElement;
        }
        let xpEvaluator = new XPathEvaluator();
        let xpathResult = xpEvaluator.evaluate(
            xpath,
            topParent,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        return xpathResult.singleNodeValue;
    }
    
    static getElementsByXPath(xpath, topParent = null) {
        if (topParent) {
            if (typeof topParent == "string") {
                topParent = document.querySelector(topParent);
            } else if (parent instanceof HTMLElement) {
                topParent = parent;
            }
        } else {
            topParent = document.documentElement;
        }
        let xpEvaluator = new XPathEvaluator();
        let xpathResult = xpEvaluator.evaluate(
            xpath,
            topParent,
            null,
            XPathResult.ORDERED_NODE_ITERATOR_TYPE
        );
        let elements = [];
        let node = null;
        while (node = xpathResult.iterateNext()) {
            elements.push(node);
        }
        return elements;
    }
    
}