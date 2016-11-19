var fs = require('fs');
var should = require('chai').should();
var Parser = require('../parser.js');

describe('Parser', function() {
    it('should return a parse tree', function() {
        var grammer = fs.readFileSync('test/grammer/calculator.jison', 'utf8');
        var expression = '1 * 2 + 3 * 4';
        var expectedParseTree = [
            [1, '*', 2], '+', [3, '*', 4]
        ];
        var parser = new Parser(grammer);
        var parseTree = parser.parse(expression)
        parseTree.should.deep.equal(expectedParseTree);
    });
});
