var OpNode = require('../lib/OpNode.js');
var NumNode = require('../lib/NumNode.js');
var VarNode = require('../lib/VarNode.js');
var Expression = require('../lib/Expression.js');


describe('Expression', function() {
    it('should evaluate the simple tree', function() {
        var expression = new Expression([op('+'), num('1'), num('2')]);

        var actual = expression.evaluate();
        var expected = 3;
        actual.should.equal(expected);
    });

    it('should evaluate the tree that contains variable', function() {
        var expression = new Expression([op('+'), war('x', exp(num('1'))), num('2')]);

        var actual = expression.evaluate();
        var expected = 3;
        actual.should.equal(expected);
    });

    // it('should evaluate complex tree ', function() {
    //     var expression = new Expression([op('+'), num('5'), [op('*'), war('x', exp([num('10')])), num('2')]]);
    //
    //     var actual = expression.evaluate();
    //     var expected = 25;
    //     actual.should.equal(expected);
    // });
    //
    // it('should evaluate complex tree with multiple variables', function() {
    //     var expression = new Expression([op('-'),war('y', exp([num('20')])),[op('+'), num('5'), [op('*'), war('x', exp([num('10')])), num('2')]]]);
    //
    //     var actual = expression.evaluate();
    //     var expected = -5;
    //     actual.should.equal(expected);
    // });
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
