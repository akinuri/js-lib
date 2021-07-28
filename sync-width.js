/**
 * Syncs the widths of elements using the widest element.
 * 
 * Used for creating vertical uniformity, but can be used for other purposes.
 */
function syncWidths(elements, hardMaxWidth = null, callback = null) {
    if (typeof elements == "string") {
        elements = document.querySelectorAll(elements);
    }
    if (!(elements instanceof Array)) {
        elements = Array.from(elements);
    }
    let widths = elements.map(el => parseFloat( getComputedStyle(el).width ));
    let maxWidth = Math.max(...widths);
    maxWidth = Math.min(maxWidth, hardMaxWidth ?? maxWidth);
    elements.forEach((el, i) => {
        el.style.width = maxWidth + "px";
        if (typeof callback == "function") {
            callback.call(el, widths[i], maxWidth);
        }
    });
}

/**
 * Provides a way to mark elements that'll be width-synced.
 */
function findSyncWidthGroups() {
    let groups = {};
    namedGroups:
    {
        let elements = Array.from(document.querySelectorAll("[class*=sync-width-]"));
        elements.forEach(el => {
            let match = el.className.match(/sync-width-([a-z]+)/);
            if (match) {
                let groupName = match[1];
                if (!groups.hasOwnProperty(groupName)) {
                    groups[groupName] = [];
                }
                groups[groupName].push(el);
            }
        });
    }
    unnamedGroups:
    {
        let containers = Array.from(document.querySelectorAll(".sync-widths"));
        containers.forEach((container, groupName) => {
            let elements = Array.from(container.querySelectorAll(".sync-width"));
            groups[groupName] = elements;
        });
    }
    return groups;
}

// Object.values(findSyncWidthGroups()).forEach(group => syncWidths(group));