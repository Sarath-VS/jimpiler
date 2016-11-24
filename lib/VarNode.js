class VarNode {
    constructor(name, expression) {
        // console.log(expression);
        this._name = name;
        this._expression = expression;
        this._type = 'var'
    }

    get name() {
        return this._name;
    }

    get value() {
        return this._expression.evaluate();
    }

    isOfType(type) {
        return this.type == type;
    }
}

module.exports = VarNode;
