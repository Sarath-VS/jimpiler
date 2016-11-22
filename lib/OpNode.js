class OpNode {
    constructor(operator) {
        this.operator = operator;
        this.type = 'operator';
    }

    get value() {
        return this.operator;
    }

    isOfType(type) {
        return this.type == type;
    }
}

module.exports = OpNode;
