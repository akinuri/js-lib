/**
 * Gets the form elements (that have name attribute) contained in the specified parent element.
 * 
 * The name attribute can be "visible" or "hidden".
 * Control what to look for with the mode argument.
 * 
 * @param mode "visible" for [name], "hidden" for [data-form-name], and "all" for either
 */
function getFormElements(parent, mode = "visible", findForm = false) {
    parent = qs(parent);
    if (findForm) {
        let form = parent.closest("form");
        parent = form ?? parent;
    }
    let query;
    switch (mode) {
        case "visible":
            query = ":is(input, select, textarea)[name]";
            break;
        case "hidden":
            query = ":is(input, select, textarea)[data-form-name]";
            break;
        case "all":
            query = ":is(input, select, textarea):is([name], [data-form-name])";
            break;
    }
    let elements = qsa(query, parent);
    let result = {};
    for (const element of elements) {
        let name = element.name || element.dataset.formName;
        result[name] = element;
    }
    return result;
}

/**
 * Gets the form elements' values (that have name attribute) contained in the specified parent element.
 * 
 * The name attribute can be "visible" or "hidden".
 * Control what to look for with the mode argument.
 * 
 * @param mode "visible" for [name], "hidden" for [data-form-name], and "all" for either
 */
function getFormValues(parent, mode = "visible", findForm = false) {
    let elements = getFormElements(parent, mode, findForm);
    let result = {};
    for (const name in elements) {
        result[name] = elements[name].value;
    }
    return result;
}

function clearFormValues(parent, mode = "visible", findForm = false) {
    let elements = getFormElements(parent, mode, findForm);
    for (const name in elements) {
        const element = elements[name];
        let tagName = element.tagName.toLowerCase();
        if (
            ["textarea", "select"].includes(tagName)
            || (
                tagName == "input"
                && [
                    "text", "search", "password", "hidden",
                    "date", "time", "datetime-local", "week", "month",
                    "email", "number", "tel", "color", "file", "range", "url",
                ].includes(element.type)
            )
        ) {
            element.value = "";
        }
        else if (tagName == "input" && ["radio", "checkbox"].includes(element.type)) {
            element.checked = false;
        }
    }
}