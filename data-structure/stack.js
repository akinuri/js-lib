// https://en.wikipedia.org/wiki/Stack_(abstract_data_type)
class Stack {
    
    #items = [];
    #maxSize = null;
    #shiftOnOverflow = false
    
    constructor(maxSize = null, shiftOnOverflow = false) {
        if (maxSize != null) this.#maxSize = maxSize;
        this.#shiftOnOverflow = shiftOnOverflow;
    }
    
    setMaxSize = (n) => this.#maxSize = n;
    getMaxSize = () => this.#maxSize;
    
    getSize = () => this.#items.length;
    getItems = () => this.#items;
    
    push(item) {
        let popped = undefined;
        if (this.#maxSize != null) {
            if (this.getSize() >= this.#maxSize) {
                if (this.#shiftOnOverflow) {
                    popped = this.#items.shift();
                    this.#items.push(item);
                }
            } else {
                this.#items.push(item);
            }
        } else {
            this.#items.push(item);
        }
        return popped;
    }
    
    pop() {
        return this.#items.pop();
    }
    
    peek() {
        return this.#items[this.#items.length - 1];
    }
    
}