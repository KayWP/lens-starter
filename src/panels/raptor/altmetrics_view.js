var PanelView = require('lens/reader').PanelView;

var AltmetricsView = function(panelCtrl, config) {
  PanelView.call(this, panelCtrl, config);

  this.$el.addClass('altmetrics-panel');

  // Hide toggle on contruction, it will be displayed once data has arrived
  this.hideToggle();
};

AltmetricsView.Prototype = function() {

  this.render = function() {
    var self = this;
    this.el.innerHTML = '';

    this.controller.getAltmetrics(function(err, altmetrics) {
      if (!err) {
        self.renderAltmetrics(altmetrics);  
      } else {
        console.error("Could not retrieve altmetrics data:", err);
      }
    });
    
    return this;
  };

  this.renderAltmetrics = function(altmetrics) {
    // Finally data is available so we tell the panel to show up as a tab
    this.showToggle();

    var $altmetrics = $('<div class="altmetrics"></div>');
    $altmetrics.append($('<div class="label">Methodology</div>'));
    $altmetrics.append($('<div class="value"></div>').text(altmetrics.score));
    $altmetrics.append($('<div class="label">Link to Jupyter Notebook</div>'));
    $altmetrics.append($('<div class="value"></div>').text(altmetrics.cited_by_tweeters_count));
    $altmetrics.append($('<div class="label">Readers on Mendeley</div>'));
    $altmetrics.append($('<div class="value"></div>').text(altmetrics.readers.mendeley));

    this.$el.append($altmetrics);
  };
};

AltmetricsView.Prototype.prototype = PanelView.prototype;
AltmetricsView.prototype = new AltmetricsView.Prototype();
AltmetricsView.prototype.constructor = AltmetricsView;

module.exports = AltmetricsView;