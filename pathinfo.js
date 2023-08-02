// https://www.php.net/manual/en/function.pathinfo
function pathinfo(path) {
    path = path.replace(/[\\\/]+/g, "/");
    while (path.endsWith("/")) {
        path = path.slice(0, -1);
    }
    const lastSlashIndex = path.lastIndexOf("/");
    const directory = path.substr(0, lastSlashIndex + 1);
    const base = path.substr(lastSlashIndex + 1);
    const lastDotIndex = base.lastIndexOf(".");
    const extension = lastDotIndex !== -1 ? base.substr(lastDotIndex + 1) : "";
    return {
        dirname: directory,
        basename: base,
        extension: extension,
        filename: lastDotIndex !== -1 ? base.substr(0, lastDotIndex) : base,
    };
}