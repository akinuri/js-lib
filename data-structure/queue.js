class Queue {
    
    #items = [];
    #maxSize = null;
    #dequeueOnOverflow = false
    
    constructor(maxSize = null, dequeueOnOverflow = false) {
        if (maxSize != null) this.#maxSize = maxSize;
        this.#dequeueOnOverflow = dequeueOnOverflow;
    }
    
    setMaxSize = (n) => this.#maxSize = n;
    getMaxSize = () => this.#maxSize;
    
    getSize = () => this.#items.length;
    getItems = () => this.#items;
    
    enqueue(item) {
        let dequeued = undefined;
        if (this.#maxSize != null) {
            if (this.getSize() >= this.#maxSize) {
                if (this.#dequeueOnOverflow) {
                    dequeued = this.dequeue();
                    this.#items.push(item);
                }
            } else {
                this.#items.push(item);
            }
        } else {
            this.#items.push(item);
        }
        return dequeued;
    }
    
    dequeue() {
        return this.#items.shift();
    }
    
    front() {
        return this.#items[this.#items.length - 1];
    }
    
    back() {
        return this.#items[0];
    }
    
}