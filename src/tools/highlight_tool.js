'use strict';

var Substance = require('substance');
var AnnotationTool = Substance.Surface.AnnotationTool;

var HighlightTool = AnnotationTool.extend({
  name: "highlight",

  getAnnotationData: function() {
    return {
      created_at: new Date()
    };
  }
});

module.exports = HighlightTool;
