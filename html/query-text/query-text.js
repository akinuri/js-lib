/**
 * Returns the first element that matches the specified text.
 */
function queryText(parentEl, text, comparison = "equals") {
    
    if (
        parentEl == null
        || parentEl instanceof HTMLDocument
        || parentEl instanceof Window
    ) {
        parentEl = document.body;
    }
    
    let argsAreValid = !(
        !(parentEl instanceof HTMLElement)
        || !text
        || !["equals", "includes"].includes(comparison)
    );
    if (!argsAreValid) {
        return null;
    }
    
    let nodes = Array.from(parentEl.childNodes);
    
    let textNodes = nodes.filter(node => node.nodeName == "#text");
    for (let i = 0; i < textNodes.length; i++) {
        let node = textNodes[i];
        if (comparison == "equals") {
            if (node.textContent && node.textContent.trim() == text) {
                return node.parentElement;
            }
        }
        else if (comparison == "includes") {
            if (node.textContent && node.textContent.includes(text)) {
                return node.parentElement;
            }
        }
        
    }
    
    let elemNodes = nodes.filter(node => ![
        "#comment",
        "#text",
        "SCRIPT",
        "IFRAME",
    ].includes(node.nodeName));
    for (let i = 0; i < elemNodes.length; i++) {
        let match = queryText(elemNodes[i], text, comparison);
        if (match) {
            return match;
        }
    }
    
    return null;
}

/**
 * Returns an array of elements that match the specified text.
 */
function queryTextAll(parentEl, text, comparison = "equals") {
    
    if (
        parentEl == null
        || parentEl instanceof HTMLDocument
        || parentEl instanceof Window
    ) {
        parentEl = document.body;
    }
    
    let argsAreValid = !(
        !(parentEl instanceof HTMLElement)
        || !text
        || !["equals", "includes"].includes(comparison)
    );
    if (!argsAreValid) {
        return [];
    }
    
    let matches = [];
    
    let nodes = Array.from(parentEl.childNodes);
    
    let textNodes = nodes.filter(node => node.nodeName == "#text");
    textNodes.forEach(node => {
        if (comparison == "equals") {
            if (node.textContent && node.textContent.trim() == text) {
                matches.push(node.parentElement);
            }
        }
        else if (comparison == "includes") {
            if (nodes.textContent && nodes.textContent.includes(text)) {
                matches.push(node.parentElement);
            }
        }
    });
    
    let elemNodes = nodes.filter(node => ![
        "#comment",
        "#text",
        "SCRIPT",
        "IFRAME",
    ].includes(node.nodeName));
    elemNodes.forEach(node => {
        let match = queryText(node, text, comparison);
        if (match) {
            matches = matches.concat(match);
        }
    });
    
    return matches;
}