function findRedundantIndentation(text) {
    let lines = [];
    if (typeof text == "string") {
        lines = text.split(/\r?\n/);
    } else if (text instanceof Array) {
        lines = text;
    } else {
        throw Error("Invalid input: " + text);
    }
    let indentationLengths = [];
    for (let line of lines) {
        if (/^\s*$/.test(line)) {
            continue;
        }
        let whitespace = line.match(/^\s+/);
        if (whitespace) {
            indentationLengths.push(whitespace[0].length);
        }
    }
    let minIndentationLength = 0;
    if (indentationLengths.length) {
        minIndentationLength = Math.min(...indentationLengths);
    }
    return minIndentationLength;
}

function trimEmptyLines(text) {
    let lines = [];
    let type = typeof text;
    if (type == "string") {
        lines = text.split(/\r?\n/);
    } else if (text instanceof Array) {
        lines = text;
    } else {
        throw Error("Invalid input: " + text);
    }
    while (/^\s*$/.test(lines[0])) {
        lines.shift();
    }
    lines.reverse();
    while (/^\s*$/.test(lines[0])) {
        lines.shift();
    }
    lines.reverse();
    if (type == "string") {
        lines = lines.join("\n");
    }
    return lines;
}

function trimTemplateLiteral(text, indentLevel = true, indentChar = "    ") {
    let lines = text.split(/\r?\n/);
    lines = trimEmptyLines(lines);
    if (indentLevel === true) {
        let indentation = findRedundantIndentation(text);
        if (indentation !== 0) {
            lines = lines.map(line => line.slice(indentation));
        }
    } else if (indentLevel > 0) {
        let pattern = new RegExp("^" + indentChar.repeat(indentLevel));
        lines = lines.map(line => line.replace(pattern, ""));
    }
    text = lines.join("\n");
    return text;
}