var _ = require('substance/helpers');
var SubstanceTools = require('substance').Surface.Tools;
var HighlightTool = require('./highlight_tool');
var SearchReplaceTool = require('./search_replace_tool');

module.exports = {
  'emphasis': SubstanceTools.Emphasis,
  'strong': SubstanceTools.Strong,
  'highlight': HighlightTool,
  'search_replace': SearchReplaceTool
};