/**
 * Returns the first element that matches the specified text.
 */
function queryText(elem, text, type = "equals") {
    
    if ( !(elem instanceof HTMLElement) || !text || !["equals", "includes"].includes(type)) {
        return null;
    }
    
    let nodes = Array.from(elem.childNodes);
    
    let textNodes = nodes.filter(node => node.nodeName == "#text");
    let elemNodes = nodes.filter(node => !["#comment", "#text", "SCRIPT", "IFRAME"].includes(node.nodeName));
    
    for (let i = 0; i < textNodes.length; i++) {
        let node = textNodes[i];
        if (type == "equals") {
            if (node.textContent && node.textContent.trim() == text) {
                return node.parentElement;
            }
        }
        else if (type == "includes") {
            if (node.textContent && node.textContent.includes(text)) {
                return node.parentElement;
            }
        }
        
    }
    
    for (let i = 0; i < elemNodes.length; i++) {
        let match = queryText(elemNodes[i], text, type);
        if (match) {
            return match;
        }
    }
    
    return null;
}



/**
 * Returns an array of elements that match the specified text.
 */
function queryTextAll(elem, text, type = "equals") {
    
    if ( !(elem instanceof HTMLElement) || !text || !["equals", "includes"].includes(type)) {
        return [];
    }
    
    let nodes = Array.from(elem.childNodes);
    
    let textNodes = nodes.filter(node => node.nodeName == "#text");
    let elemNodes = nodes.filter(node => !["#comment", "#text", "SCRIPT", "IFRAME"].includes(node.nodeName));
    
    let matches = [];
    
    textNodes.forEach(node => {
        if (type == "equals") {
            if (node.textContent && node.textContent.trim() == text) {
                matches.push(node.parentElement);
            }
        }
        else if (type == "includes") {
            if (nodes.textContent && nodes.textContent.includes(text)) {
                matches.push(node.parentElement);
            }
        }
    });
    
    elemNodes.forEach(node => {
        let match = queryText(node, text, type);
        if (match) {
            matches = matches.concat(match);
        }
    });
    
    return matches;
}
