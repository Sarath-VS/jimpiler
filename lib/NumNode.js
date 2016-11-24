class NumNode {
    constructor(number) {
        this.number = number;
        this.type = 'number';
    }

    get value() {
        return this.number;
    }

    isOfType(type) {
        return this.type == type;
    }

    evaluate() {
      return this.value;
    }
}

module.exports = NumNode;
