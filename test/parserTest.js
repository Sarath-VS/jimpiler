var fs = require('fs');
var should = require('chai').should();
var expect = require('chai').expect;
var Parser = require('../lib/parser.js');
var OpNode = require('../lib/OpNode.js');
var NumNode = require('../lib/NumNode.js');
//
describe('Parser', function() {
    it('should return a parse tree for simple expressions', function() {
        var grammer = fs.readFileSync('test/grammer/calculator.jison', 'utf8');
        var expression = '2 + 3 * 4';
        var expectedParseTree = [new NumNode('2'), new OpNode('+'), [new NumNode('3'), new OpNode('*'), new NumNode('4')]];
        assert(grammer, expression, expectedParseTree);
    });
//
//     it('should return a parse tree for multiline expressions', function(done) {
//         var grammer = fs.readFileSync('test/grammer/vcalc.jison', 'utf8');
//         var exp1 = 'x = 10; 5 + x * 2;';
//         var expected1 = [5, '+', [10, '*', 2]];
//         assert(grammer, exp1, expected1);
//
//         var exp1 = 'x = 10; y = 20; z = 30; (x ^ 2) + (y ^ 2) - ( z ^ 2);';
//         var expected1 = [
//             [10, '^', 2], '+', [20, '^', 2], '-', [30, '^', 2]
//         ];
//         assert(grammer, exp1, expected1);
//     });
//
//     it('should return a parse tree for multiline expressions', function(done) {
//         var grammer = fs.readFileSync('test/grammer/vcalc.jison', 'utf8');
//         var exp = 'x ^ 2; x = 10;';
//         assertError(grammer, exp, `Error: 'undefined' variable`);
//     });
});
//
var assert = (grammer, expression, expected) => {
    var parser = new Parser(grammer);
    var parseTree = parser.parse(expression);
    parseTree.should.deep.equal(expected);
};

var assertError = (grammer, expression, errorMessage) => {
    var parser = new Parser(grammer);
    expect(() => parser.parse(expression)).to.throw(Error, errorMessage);
}
