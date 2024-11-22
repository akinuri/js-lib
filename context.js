class Context {

    constructor(parent, properties = []) {
        this.parent = parent;
        this.properties = properties;
        this.stack = [];
    }

    save() {
        const context = {};
        this.properties.forEach(prop => {
            context[prop] = this[prop];
        });
        this.stack.push(context);
    }

    restore() {
        if (this.stack.length > 0) {
            const context = this.stack.pop();
            Object.assign(this.parent, context);
        }
    }

}