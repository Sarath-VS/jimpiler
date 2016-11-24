var OpNode = require('../lib/OpNode.js');
var NumNode = require('../lib/NumNode.js');
var VarNode = require('../lib/VarNode.js');

module.exports.num = function(number) {
    return new NumNode(number);
}

module.exports.op = function(operator) {
    return new OpNode(operator);
}

module.exports.war = (name, value) => {
    return new VarNode(name, num(value));
}
