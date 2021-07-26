/**
 * @requires String.kebabCase2camelCase()
 */
function style(element, property, value) {
    if (property) {
        if (value) {
            element.style[String.kebabCase2camelCase(property)] = value;
        }
        return getComputedStyle(element)[property];
    }
    return null;
}