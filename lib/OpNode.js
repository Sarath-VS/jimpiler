class OpNode {
    constructor(operator) {
        this.operator = operator;
    }

    get value() {
        return this.operator;
    }
}

module.exports = OpNode;
