var fs = require('fs');
var jison = require('jison');

class Parser {
    constructor(grammer) {
        this.grammer = grammer;
        this.parser = new jison.Parser(grammer);
    }

    parse(exp) {
        return this.parser.parse(exp);
    }
}

module.exports = Parser;
