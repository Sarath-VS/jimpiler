var should = require('chai').should();
var Jimpiler = require('../Jimpiler');

var jimpiler = new Jimpiler('./test/grammer/calculator.jison');

describe('should add appropriate paranthesis', function() {
    it('1+2*3 should give back (1+(2*3))', function() {
        var actual = jimpiler.process('1+2*3');
        var expected = '(1+(2*3))';
        actual.should.equal(expected);
    });
});
