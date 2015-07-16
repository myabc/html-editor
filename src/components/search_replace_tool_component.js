'use strict';

var $$ = React.createElement;
var Substance = require('substance');
var ToolComponent = require('substance-ui/tool_component');

// ToolComponent
// -------------

// TODO: not sure if we should extend ToolComponent
// becase in this case here we don't respond to any surface selection actions
// We don't require a surface reference here, we just need to know the containerId
// which gets injected as a prop.

class SearchReplaceToolComponent extends ToolComponent {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  onClick(e) {
    e.preventDefault();
    var searchStr = React.findDOMNode(this.refs.searchStr).value;
    var replaceStr = React.findDOMNode(this.refs.replaceStr).value;
    this.tool.searchAndReplace(this.props.doc, this.props.containerId, searchStr, replaceStr);
  }

  render() {
    return $$('div', {className: 'search-replace-tool-component'},
      $$('div', {className: 'label'}, "Find:"),
      $$('input', {ref: 'searchStr', type: 'text'}),
      $$('div', {className: 'label'}, "Replace:"),
      $$('input', {ref: 'replaceStr', type: 'text'}),
      $$('button', {className: 'button', onClick: this.onClick}, "Replace All")
    );
  }
}

SearchReplaceToolComponent.displayName = "SearchReplaceToolComponent";

SearchReplaceToolComponent.contextTypes = {
  toolRegistry: React.PropTypes.object.isRequired
};


module.exports = SearchReplaceToolComponent;