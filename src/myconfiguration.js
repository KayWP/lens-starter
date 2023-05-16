var DefaultConfiguration = require('lens-converter').DefaultConfiguration;

var MyConfiguration = function() {
  DefaultConfiguration.apply(this, arguments);
};

MyConfiguration.Prototype = function() {

  var _super = DefaultConfiguration.prototype;

  this.showNode = function(state, node) {
    _super.showNode.call(this, state, node);
    if (node.type === 'raptor') {
      state.doc.show('raptors', node.id);
    }
  };

};

MyConfiguration.Prototype.prototype = DefaultConfiguration.prototype;
MyConfiguration.prototype = new MyConfiguration.Prototype();
MyConfiguration.prototype.constructor = MyConfiguration;

module.exports = MyConfiguration;