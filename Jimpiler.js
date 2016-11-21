var Parser = require('./lib/Parser.js');
const fs = require('fs');

class Jimpiler {
    constructor(grammerFile) {
        this.grammar = fs.readFileSync(grammerFile, 'utf8');
        this.parser = new Parser(this.grammar);
    }

    process(expression) {
        var parseTree = this.parser.parse(expression);
        return evaluate(parseTree);
    }
}

var evaluate = (parseTree) => {
    var result = parseTree.reduce((result, node) => {
        if (node instanceof Array) return result + evaluate(node);
        return result + node.value;
    }, '');

    return '(' + result + ')';
}



module.exports = Jimpiler;
