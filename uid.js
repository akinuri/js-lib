/**
 * A class/object to generate pseudo-random unique ids.
 * https://github.com/akinuri/js-lib/blob/master/uid.js
 */
var UID = {
    
    /**
     * Keep a record of all generated ids to keep track of collisions AND to generate a unique id.
     */
    ids : [],
    
    /**
     * Keep a record of all collisions that take place when generating ids (for debug purposes).
     */
    collisions : [],
    
    /**
     * Log collisions to the console (for debug purposes).
     */
    logCollisions : false,
    
    /**
     * Generates an id.
     * Logs it in internal storage, AND (if desired) to the console, AND generates a new id if it collides with previous ids.
     */
    generate : function generateUniqueID(length, retryOnCollision = true, logCollision = false) {
        let id = UID.random(length);
        if (UID.isUnique(id)) {
            UID.ids.push(id);
        } else {
            if (UID.logCollisions || logCollision) {
                console.log("[UID]: collision detected: " + id)
            };
            UID.collisions.push(id);
            if (retryOnCollision) {
                id = UID.generate(length);
            }
        }
        return id;
    },
    
    /**
     * Checks if the id is unique.
     */
    isUnique : function (id) {
        return UID.ids.indexOf(id) == -1;
    },
    
    /**
     * Generates a random string.
     */
    random : function generateRandomString(length = 8) {
        if (length > 8) length = 8;
        let id = parseInt(Math.random().toString().slice(2));
        id = id.toString(36);
        id = id.slice(-length);
        return id;
    },
    
    /**
     * Empties the internal storage.
     */
    reset : function resetIDsAndCollisions() {
        UID.ids = [];
        UID.collisions = [];
    },
    
    /**
     * Collision test.
     */
    test : function (iterations = 10000, idLength = 4) {
        for (let i = 0; i < iterations; i++) {
            UID.generate(idLength, false);
        }
        console.log(UID.collisions.length + "/" + iterations);
        console.log({...UID});
        UID.reset();
    },
    
};