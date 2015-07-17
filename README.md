# Substance HTML Editor

A flexible Rich Text Editing Component. Install and play around. For documentation about Substance head over to http://github.com/substance/substance.


## Basic Usage

```js
var React = require("react");
var HtmlEditor = require("substance-html-editor");
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

```js
var React = require("react");
var HtmlEditor = require("substance-html-editor");
var $$ = React.createElement;

React.render(
  $$(HtmlEditor, {
    content: htmlContent,
    tools: [
      $$(ToolComponent, { tool: 'emphasis', title: 'Emphasis', classNames: ['button', 'tool']}, "Emphasis"),
      $$(ToolComponent, { tool: 'strong', title: 'Strong', classNames: ['button', 'tool']}, "Strong"),
    ],
    onContentChanged: function(html) {
      console.log('Edited content');
    }
  }),
  document.getElementById('editor_container')
);
```

## Development

Clone the repository.

```bash
$ git clone https://github.com/substance/html-editor.git
```

Navigate to the source directory.

```bash
$ cd starter
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