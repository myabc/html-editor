'use strict';

var _ = require("substance/helpers");
var $$ = React.createElement;

var Editor = require("./editor");
var RichTextArticle = require("./rich_text_article");

var SAMPLE_DOC = require("../data/sample_doc");
var doc = RichTextArticle.fromJson(SAMPLE_DOC);

window.doc = doc; // for debugging in the console

// Start the editor app

$(function() {
  React.render(
    $$(Editor, {
      doc: doc
    }),
    document.getElementById('container')
  );
});

