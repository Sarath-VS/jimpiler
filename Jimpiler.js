var Parser = require('./lib/Parser.js');
const fs = require('fs');

class Jimpiler {
    constructor(grammerFile) {
        this.grammar = fs.readFileSync(grammerFile, 'utf8');
        this.parser = new Parser(this.grammar);
    }

    process(expression, convert) {
        var parseTree = this.parser.parse(expression);
        return evaluate(parseTree, convert);
    }
}

var evaluate = (parseTree, convert) => {
    var result = parseTree.reduce((result, node) => {
        if (node instanceof Array) return result + evaluate(node,convert);
        return result + convert(node) + ' ';
    }, '');

    return '( ' + result + ')';
}



module.exports = Jimpiler;
