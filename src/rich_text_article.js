"use strict";

var Substance = require('substance');
var Document = Substance.Document;

var Paragraph = Document.Paragraph;
var Emphasis = Document.Emphasis;
var Strong = Document.Strong;

var Highlight = Document.ContainerAnnotation.extend({
  name: 'highlight',
  properties: {
    created_at: 'date'
  }
});

var schema = new Document.Schema("rich-text-article", "1.0.0");

schema.getDefaultTextType = function() {
  return "paragraph";
};

schema.addNodes([
  Paragraph,
  Emphasis,
  Strong,
  Highlight
]);

var RichTextArticle = function() {
  RichTextArticle.super.call(this, schema);
};

RichTextArticle.Prototype = function() {

  this.initialize = function() {
    this.super.initialize.apply(this, arguments);

    this.create({
      type: "container",
      id: "body",
      nodes: []
    });
  };
};

Substance.inherit(RichTextArticle, Document);

RichTextArticle.schema = schema;

RichTextArticle.fromJson = function(json) {
  var doc = new RichTextArticle();
  doc.loadSeed(json);
  return doc;
};

module.exports = RichTextArticle;