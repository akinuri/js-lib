/**
 * @uses html/qsa() 
 */
function getInputByNameOrId(nameOrId, parentEl) {
    let inputs = qsa("input, textarea, select", parentEl);
    let match = null;
    for (let input of inputs) {
        if ([input.name, input.id].includes(nameOrId)) {
            match = input;
            break;
        }
    }
    return match;
}