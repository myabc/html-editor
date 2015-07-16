'use strict';

var Substance = require('substance');
var Tool = Substance.Surface.Tool;
var searchReplace = require('../transformations/search_replace');

var SearchReplaceTool = Tool.extend({
  name: "search_replace",

  update: function(surface, sel) {
    this.surface = surface;

    var newState = {
      surface: surface,
      sel: sel,
      disabled: false
    };

    this.setToolState(newState);
  },

  searchAndReplace(doc, containerId, searchStr, replaceStr) {
    doc.transaction(function(tx) {
      searchReplace(tx, {
        containerId: containerId,
        searchStr: searchStr,
        replaceStr: replaceStr,
      });
    });
  }

});

module.exports = SearchReplaceTool;