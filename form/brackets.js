/**
 * @uses number/loop()
 */
function getBracketsSegment(bracketText, index = 0) {
    let segments = getBracketsSegments(bracketText);
    index = loop(index, 0, segments.length - 1);
    return segments[index];
}

function getBracketsSegments(bracketText) {
    return bracketText.split(/[\[\]]/).filter(seg => seg);
}

function buildBracketsFromSegments(...segments) {
    let brackets = segments.map((segment, index) => {
        if (index == 0) {
            return segment;
        } else {
            return `[${segment}]`;
        }
    });
    brackets = brackets.join("");
    return brackets;
}