// https://stackoverflow.com/a/11972692/2202732
function shuffleChildren(parent) {
    for (var i = parent.children.length - 1; i >= 0; i--) {
        parent.appendChild(parent.children[Math.round(Math.random() * i)]);
    }
}