var fs = require('fs');
var should = require('chai').should();
var expect = require('chai').expect;
var Parser = require('../lib/parser.js');
var Shelf = require('../lib/Shelf.js');
var OpNode = require('../lib/OpNode.js');
var NumNode = require('../lib/NumNode.js');
var VarNode = require('../lib/VarNode.js');
var Expression = require('../lib/Expression.js');

var shelf;

describe('Parser', function() {
    before(function() {
        shelf = new Shelf();
    })
    it('should return a parse tree for simple expressions', function() {
        var grammer = fs.readFileSync('test/grammer/grammar.jison', 'utf8');
        var expression = '2 + 3 * 4';
        var expressionTree = new Expression([op('+'), num('2'), [op('*'), num('3'), num('4')]]);
        var expectedParseTree = [shelf, expressionTree];

        assert(grammer, expression, expectedParseTree);
    });

    it('should return a parse tree for complex expression', function() {
        var grammer = fs.readFileSync('test/grammer/grammar.jison', 'utf8');
        var expression = '1 + 2 + 3 + 4';
        var expressionTree = new Expression([op('+'), [op('+'), [op('+'), num('1'), num('2')], num('3')], num('4')]);
        var expectedParseTree = [shelf, expressionTree];

        assert(grammer, expression, expectedParseTree);
    });

    it('should return a parse tree for multiline expressions', function() {
        var grammer = fs.readFileSync('test/grammer/grammar.jison', 'utf8');
        var exp1 = 'x = 10; 5 + x * 2;';
        var varx = war('x', exp(num('10')));
        shelf.add('x', varx);
        var expressionTree = new Expression([op('+'), num('5'), [op('*'), war('x', exp(num('10'))), num('2')]])
        var expectedParseTree = [shelf, expressionTree];

        assert(grammer, exp1, expectedParseTree);

        var exp2 = 'x = 10; y = x+10; z = 30; (x ^ 2) + (y ^ 2) - ( z ^ 2);';
        var vary = war('y', exp([op('+'), varx, num('10')]));
        shelf.add('y',vary).add('z', war('z', exp(num('30'))));
        var expressionTree2 = new Expression([op('-'), [op('+'), [op('^'), varx, num('2')],
                [op('^'), vary, num('2')]
            ],
            [op('^'), war('z', exp(num('30'))), num('2')]
        ])

        var expected2 = [shelf, expressionTree2];
        assert(grammer, exp2, expected2);
    });

    it('should throw an error for illegal operations', function() {
        var grammer = fs.readFileSync('test/grammer/grammar.jison', 'utf8');
        var exp = 'x ^ 2; x = 10;';
        assertError(grammer, exp, `Error: 'undefined' variable`);
    });
});

var num = function(number) {
    return new NumNode(number);
}

var op = function(operator) {
    return new OpNode(operator);
}

var war = (name, value) => {
    return new VarNode(name, value);
}

var exp = (value) => {
    return new Expression(value)
}

var assert = (grammer, expression, expected) => {
    var parser = new Parser(grammer);
    var parseTree = parser.parse(expression);
    parseTree.should.deep.equal(expected);
};

var assertError = (grammer, expression, errorMessage) => {
    var parser = new Parser(grammer);
    expect(() => parser.parse(expression)).to.throw(Error, errorMessage);
}
