class Expression {
    constructor(expression) {
        this._tree = expression;
    }

    get value() {
        return this._tree;
    }

    evaluate(tree = this._tree) {
        if (!(tree instanceof Array)) return tree.evaluate();
        var params = tree.slice(1).map((n) => {
            if (n instanceof Array) return this.evaluate(n);
            return n.value;
        });
        return tree[0].evaluate(params);
    }
}

module.exports = Expression;
