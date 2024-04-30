function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let random    = Math.floor(Math.random() * (i + 1));
        let temp      = array[i];
        array[i]      = array[random];
        array[random] = temp;
    }
}