class OpNode {
    constructor(operator) {
        this._operator = operator;
        this._type = 'operator';
    }

    get value() {
        return this._operator;
    }

    isOfType(type) {
        return this._type == type;
    }

    evaluate([a, b]) {
        return eval(`${a} ${this.value} ${b}`);
    }
}

module.exports = OpNode;
