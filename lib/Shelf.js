class Shelf {
    constructor() {
        this.items = {};
    }

    add(name, value) {
        this.items[name] = value;
        return this;
    }

    fetch(name) {
        return this.items[name];
    }
}

module.exports = Shelf;
