var Parser = require('./lib/Parser.js');
const fs = require('fs');

class Jimpiler {
    constructor(grammerFile) {
        this.grammar = fs.readFileSync(grammerFile, 'utf8');
        this.parser = new Parser(this.grammar);
    }

    process(expression, convert, calculate) {
        var parseTree = this.parser.parse(expression);
        var parseString = evaluate(parseTree, convert);
        return calculate ? calculate(parseString) : parseString;
    }
}

var evaluate = (parseTree, convert) => {
    return parseTree.slice(1)[0].evaluate();
}

module.exports = Jimpiler;
