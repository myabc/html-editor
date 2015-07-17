'use strict';

var $$ = React.createElement;
var HtmlEditor = require('../index');
var ToolComponent = HtmlEditor.ToolComponent;
var TextToolComponent = HtmlEditor.TextToolComponent;
var Icon = require("substance-ui/font_awesome_icon");

var htmlContent = [
  "<p>Lorem <strong>ipsum dolor</strong> sit amet, consectetur <em>adipiscing elit</em></p>",
  // "<h1>Hello world</h1>",
  "<p>Proin in <strong>luctus sapien</strong>, ultrices commodo augue. Phasellus ultrices commodo augue, in blandit nibh.</p>"
].join('\n');

class Toolbar extends React.Component {
  render() {
    return $$("div", { className: "toolbar"},
      $$(TextToolComponent, { tool: 'text', title: 'Switch text'}),
      $$(ToolComponent, { tool: 'undo', title: 'Undo', classNames: ['button', 'tool']}, $$(Icon, {icon: "fa-undo"})),
      $$(ToolComponent, { tool: 'redo', title: 'Redo', classNames: ['button', 'tool']}, $$(Icon, {icon: "fa-repeat"})),

      $$(ToolComponent, { tool: 'emphasis', classNames: ['button', 'tool']}, $$(Icon, {icon: "fa-italic"})),
      $$(ToolComponent, { tool: 'strong', classNames: ['button', 'tool']}, $$(Icon, {icon: "fa-bold"}))
    );
  }
}

class MyEditor extends React.Component {

  onClick(e) {
    var editor = this.refs.htmlEditor;
    console.log('editor', editor);
    console.log('store contnet', editor.getContent());
  }

  render() {
    return $$('div', {className: 'my-editor-component'},
      $$(HtmlEditor, {
        ref: 'htmlEditor',
        content: htmlContent,
        toolbar: Toolbar,
        enabledTools: ["text", "strong", "emphasis"],
        // onContentChanged: function(doc, change) {
        //   // console.log('document changed', change);
        //   // console.log('new content', doc.toHtml());
        // }
      }),
      $$('button', {onClick: this.onClick.bind(this)}, "click me")
    );

  }
}

$(function() {
  React.render(
    $$(MyEditor),
    document.getElementById('editor_container')
  );
});