# Substance HTML Editor

A flexible Rich Text Editing Component. Install and play around. For documentation about Substance head over to http://github.com/substance/substance.


## Basic Usage

```js
var HtmlEditor = require("substance-ui/html-editor");
var $$ = React.createElement;

React.render(
  $$(HtmlEditor, {
    content: htmlContent,
    onContentChanged: function(html) {
      console.log('Edited content');
    }
  }),
  document.getElementById('editor_container')
);
```

## Enabling a custom toolbar

Here is a more complete example, including a custom toolbar.

```js
var HtmlEditor = require("substance-ui/html-editor");
var TextToolComponent = require("substance-ui/text_tool_component");
var ToolComponent = require("substance-ui/tool_component");
var $$ = React.createElement;

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

  handleSave(e) {
    var editor = this.refs.htmlEditor;
    console.log('new content', editor.getContent());
  }

  render() {
    return $$('div', {className: 'my-editor-component'},
      $$(HtmlEditor, {
        ref: 'htmlEditor',
        content: htmlContent,
        toolbar: Toolbar,
        enabledTools: ["text", "strong", "emphasis"]
      }),
      $$('button', {onClick: this.handleSave.bind(this)}, "Save")
    );

  }
}

$(function() {
  React.render(
    $$(MyEditor),
    document.getElementById('editor_container')
  );
});
```






## Development

Clone the repository.

```bash
$ git clone https://github.com/substance/html-editor.git
```

Navigate to the source directory.

```bash
$ cd html-editor
```

Install via npm

```bash
$ npm install
```

Start the dev server

```bash
$ npm run start
```

And navigate to [http://localhost:5000](http://localhost:5000)

## Bundling

We use a simple gulp script to make a new distribution. Simply run the `gulp` command and a dist folder will be created for you.

```bash
gulp
```
