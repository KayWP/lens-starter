var _ = require('underscore');
var LensConverter = require('lens-converter');
var LensArticle = require('lens-article');
var MyConfiguration = require('./myconfiguration');

var MyConverter = function(options) {
  LensConverter.call(this, options);
};

MyConverter.Prototype = function() {

  this.getConfiguration = function(xmlDoc) {
    var publisherName = xmlDoc.querySelector("publisher-name").textContent;
    if (publisherName === 'Rapidiraptor') {
      console.log('Using Rapidiraptor configuration for this article.');
      return new MyConfiguration(this.options);
    } else {
      return LensConverter.prototype.getConfiguration.call(this, xmlDoc);
    }
  };

  this.createDocument = function() {
    // It is possible to inject custom node types directly into the LensArticle constructor
    var article = new LensArticle({
      nodeTypes: require('./nodes')
    });

    article.create({
      type: 'view',
      id: 'raptors',
      nodes: []
    });

    return article;
  };

  this._bodyNodes['raptor'] = function(state, child) {
    return this.raptor(state, child);
  };

  this.raptor = function(state, raptorEl) {
    var src = raptorEl.getAttribute('src');
    var descr = raptorEl.textContent;
    var raptorNode = {
      type: "raptor",
      id: state.nextId('raptor'),
      img_path: src || '',
      short_description: descr || ''
    };
    state.doc.create(raptorNode);
    return raptorNode;
  };

};
MyConverter.Prototype.prototype = LensConverter.prototype;
MyConverter.prototype = new MyConverter.Prototype();

module.exports = MyConverter;