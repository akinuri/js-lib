function createJSONObjURL(obj) {
    const str = JSON.stringify(obj);
    const blob = new Blob([str], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    return url;
}