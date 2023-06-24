/**
 * A class to generate pseudo-random unique ids.
 * 
 * @requires String.random()
 */
var UID = {
    
    /**
     * Keep a record of all generated ids
     * to keep track of collisions AND to generate a unique id.
     */
    ids : [],
    
    /**
     * Keep a record of all collisions
     * that take place when generating ids (for debug purposes).
     */
    collisions : [],
    
    /**
     * Log collisions to the console (for debug purposes).
     */
    logCollisions : false,
    
    /**
     * Generates an id.
     * Logs it in the internal storage,
     *  AND (if desired) to the console,
     *  AND generates a new id if it collides with previous ids.
     */
    generate : function generateUniqueID(
        length, retryOnCollision = true, logCollision = false
    ) {
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
     * Generates a random string to be used as an id.
     */
    random : function generateRandomString(length = 8) {
        return String.random(length);
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
        let temp = {
            ids : this.ids,
            collisions : this.collisions,
        };
        UID.reset();
        for (let i = 0; i < iterations; i++) {
            UID.generate(idLength, false);
        }
        console.log(UID.collisions.length + " collisions in " + iterations + " ids");
        console.log({ids : UID.ids.slice(), collisions: UID.collisions.slice() });
        UID.ids = temp.ids;
        UID.collisions = temp.collisions;
    },
    
};