// https://www.php.net/manual/en/function.basename.php
function basename(path, suffix) {
    path = path.replace(/[\\\/]+/g, "/");
    while (path.endsWith("/")) {
        path = path.slice(0, -1);
    }
    let result = path.substr(path.lastIndexOf("/") + 1);
    if (suffix && result.endsWith(suffix)) {
        result = result.slice(0, result.lastIndexOf(suffix));
    }
    return result;
}