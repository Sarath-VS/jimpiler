var should = require('chai').should();
var Jimpiler = require('../Jimpiler');
var numberToWords = require('number-to-words');

var jimpiler = new Jimpiler('./test/grammer/calculator.jison');
describe('jimpiler', function() {
    describe('should add appropriate paranthesis', function() {
        it('1+2*3 should give back (1+(2*3))', function() {
            var actual = jimpiler.process('1+2*3', identity);
            var expected = '( 1 + ( 2 * 3 ))';
            actual.should.equal(expected);
        });

        it('1+2*3 should give back (one plus(two times three))', function() {
            var actual = jimpiler.process('1+2*3', toWords);
            var expected = '( one plus ( two times three ))';
            actual.should.equal(expected);
        });
    });

    // describe('should evaluate the expression', function() {
    //     it('1+2 should give back 3', function(done) {
    //         var actual = jimpiler.process('1+2', identity, )
    //     });
    // });
});

var operators = {
    '+': 'plus',
    '*': 'times'
}

var toWords = function(node) {
    if (node.isOfType('number'))
        return numberToWords.toWords(node.value);
    return operators[node.value];
}

var identity = function(node) {
    return node.value;
}

var reduce = (res, item) => {
    return res
}
