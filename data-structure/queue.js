class Queue {
    
    #items = [];
    #maxSize = Infinity;
    #dequeueOnOverflow = false;
    
    constructor(maxSize = Infinity, dequeueOnOverflow = false) {
        this.#maxSize = maxSize;
        this.#dequeueOnOverflow = dequeueOnOverflow;
    }
    
    getMaxSize = () => this.#maxSize;
    getSize = () => this.#items.length;
    getItems = () => this.#items;
    isEmpty = () => this.#items.length === 0;
    isFull = () => this.#maxSize !== null && this.#items.length >= this.#maxSize;
    
    enqueue(item) {
        let dequeued;
        if (this.#dequeueOnOverflow && this.isFull()) {
            dequeued = this.dequeue();
        }
        this.#items.push(item);
        return dequeued;
    }
    
    dequeue() {
        return this.#items.shift();
    }
    
    front() {
        return this.#items[0];
    }
    
    back() {
        return this.#items[this.#items.length - 1];
    }
    
}