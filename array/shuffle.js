function shuffle(...items) {
    for (let i = items - 1; i > 0; i--) {
        let random    = Math.floor(Math.random() * (i + 1));
        let temp      = items[i];
        items[i]      = items[random];
        items[random] = temp;
    }
}