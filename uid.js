// requires improved Math.random()
// https://github.com/akinuri/js-lib/blob/master/Math.js#L10
var uid = {
    ids        : [],
    collisions : [],
    generate   : function genuid() {
        var random    = parseInt(Math.random(100000, 999999), 10).toString();
        var timestamp = performance.now().toString().replace(".", "").slice(-6);
        var id        = parseInt(random + timestamp);
        if (uid.ids.indexOf(id) == -1) {
            uid.ids.push(id);
        } else {
            console.log("[uid]: collision detected: " + id);
            uid.collisions.push(id);
            id = uid.generate();
        }
        return id;
    },
};