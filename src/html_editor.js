'use strict';

var Substance = require('substance');
var $$ = React.createElement;
var Surface = Substance.Surface;
var _ = require("substance/helpers");

var HtmlArticle = require("./html_article");
var ContainerEditor = Surface.ContainerEditor;

var Clipboard = Surface.Clipboard;
var SurfaceManager = Surface.SurfaceManager;
var ToolComponent = require('substance-ui/tool_component');
var TextToolComponent = require('substance-ui/text_tool_component');

var components = {
  "paragraph": require('substance-ui/paragraph_component'),
  "heading": require('substance-ui/heading_component')
};

var tools = Surface.Tools;

// HtmlEditor
// ----------------
// 
// A simple rich text editor implementation based on Substance

class HtmlEditor extends React.Component {

  constructor(props) {
    super(props);

    var doc = HtmlArticle.fromHtml(props.content);
    this.state = {
      doc: doc
    };

    window.doc = doc;

    doc.toHtml();

    this.surfaceManager = new SurfaceManager(doc);
    this.clipboard = new Clipboard(this.surfaceManager, doc.getClipboardImporter(), doc.getClipboardExporter());

    var editor = new ContainerEditor('body');
    this.surface = new Surface(this.surfaceManager, doc, editor);

    // Component registry
    this.componentRegistry = new Substance.Registry();
    _.each(components, function(ComponentClass, name) {
      this.componentRegistry.add(name, ComponentClass);
    }, this);

    // Tool registry
    this.toolRegistry = new Substance.Registry();
    _.each(tools, function(ToolClass) {
      this.toolRegistry.add(ToolClass.static.name, new ToolClass());
    }, this);

    if (this.props.onContentChanged) {
      this.debouncedOnContentChanged = _.debounce(this.props.onContentChanged, 1000);  
    }
  }

  onDocumentChanged(change) {
    var doc = this.state.doc;

    if (this.props.onContentChanged) {
      this.debouncedOnContentChanged(doc, change);
    }

    if (change.isAffected(['body', 'nodes'])) {
      this.forceUpdate();
    }
  }

  onSelectionChanged(sel, surface) {
    this.toolRegistry.each(function(tool) {
      tool.update(surface, sel);
    }, this);
  }

  getChildContext() {
    return {
      surface: this.surface,
      componentRegistry: this.componentRegistry,
      toolRegistry: this.toolRegistry
    };
  }

  render() {
    var doc = this.state.doc;
    var containerNode = doc.get('body');

    // Prepare container components (aka nodes)
    // ---------

    var components = [];
    components = components.concat(containerNode.nodes.map(function(nodeId) {
      var node = doc.get(nodeId);
      var ComponentClass = this.componentRegistry.get(node.type);
      return $$(ComponentClass, { key: node.id, doc: doc, node: node });
    }.bind(this)));

    return $$('div', {className: 'editor-component'},
      this.props.toolbar ? $$(this.props.toolbar) : $$('div'),
      $$('div', {className: 'body-nodes', ref: 'bodyNodes', contentEditable: true, spellCheck: false},
        components
      )
    );
  }

  componentDidMount() {
    var doc = this.state.doc;

    doc.connect(this, {
      'document:changed': this.onDocumentChanged
    });

    this.surfaceManager.registerSurface(this.surface, {
      enabledTools: this.props.enabledTools
    });

    this.surface.attach(this.refs.bodyNodes.getDOMNode());
    this.surface.connect(this, {
      'selection:changed': this.onSelectionChanged
    });

    this.clipboard.attach(React.findDOMNode(this));

    // Needed?
    // this.forceUpdate(function() {
    //   this.surface.rerenderDomSelection();
    // }.bind(this));
  }

  componentWillUnmount() {
    var doc = this.state.doc;
    doc.disconnect(this);
    this.surface.dispose();
    this.clipboard.detach(React.findDOMNode(this));
    this.surfaceManager.dispose();
  }

  componentDidUpdate() {
    // When the state is changed this and particularly TextProperties
    // get rerendered (e.g., as the highlights might have changed)
    // Unfortunately we loose the DOM selection then.
    // Thus, we are resetting it here, but(!) delayed as otherwise the surface itself
    // might not have finished setting the selection to the desired and a proper state.
    var self = this;
    setTimeout(function() {
      self.surface.rerenderDomSelection();
    });
  }
}

HtmlEditor.displayName = "HtmlEditor";
// child context signature provided to editor components
HtmlEditor.childContextTypes = {
  surface: React.PropTypes.object,
  componentRegistry: React.PropTypes.object,
  toolRegistry: React.PropTypes.object
};


// Expose some more useful components
HtmlEditor.ToolComponent = ToolComponent;
HtmlEditor.TextToolComponent = TextToolComponent;

module.exports = HtmlEditor;