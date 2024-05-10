import React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "./RichTextEditor.scss";
import "../../../../node_modules/draft-js/dist/Draft.css";

// BLABLA

export class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState }); // Actualiza el estado local del editor
      this.props.onContentChange(
        editorState.getCurrentContent().getPlainText("\u0001")
      ); // Llama a la función de devolución de llamada con el nuevo contenido
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Agrega el post..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  BLACK_TEXT: {
    color: "black",
  },
  RED_TEXT: {
    color: "red",
  },
  BLUE_TEXT: {
    color: "blue",
  },
  GREEN_TEXT: {
    color: "green",
  },
  PURPLE_TEXT: {
    color: "purple",
  },
  YELLOW_TEXT: {
    color: "yellow",
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    let label = this.props.label;
    let colorIndicator;
    switch (this.props.style) {
      case "BLACK_TEXT":
        colorIndicator = (
          <span
            style={{ backgroundColor: "black" }}
            className="ColorIndicator"
          ></span>
        );
        break;
      case "RED_TEXT":
        colorIndicator = (
          <span
            style={{ backgroundColor: "red" }}
            className="ColorIndicator"
          ></span>
        );
        break;
      case "BLUE_TEXT":
        colorIndicator = (
          <span
            style={{ backgroundColor: "blue" }}
            className="ColorIndicator"
          ></span>
        );
        break;
      case "GREEN_TEXT":
        colorIndicator = (
          <span
            style={{ backgroundColor: "green" }}
            className="ColorIndicator"
          ></span>
        );
        break;
      case "PURPLE_TEXT":
        colorIndicator = (
          <span
            style={{ backgroundColor: "purple" }}
            className="ColorIndicator"
          ></span>
        );
        break;
      case "YELLOW_TEXT":
        colorIndicator = (
          <span
            style={{ backgroundColor: "yellow" }}
            className="ColorIndicator"
          ></span>
        );
        break;
      default:
        colorIndicator = null;
    }

    if (colorIndicator) {
      label = colorIndicator;
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Cita", style: "blockquote" },
  { label: "Lista desordenada", style: "unordered-list-item" },
  { label: "Lista ordenada", style: "ordered-list-item" },
  { label: "Cuadro de texto", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Negrita", style: "BOLD" },
  { label: "Cursiva", style: "ITALIC" },
  { label: "Subrayado", style: "UNDERLINE" },
  { label: "Monoespaciado", style: "CODE" },
  { label: "Negro", style: "BLACK_TEXT" },
  { label: "Rojo", style: "RED_TEXT" },
  { label: "Azul", style: "BLUE_TEXT" },
  { label: "Verde", style: "GREEN_TEXT" },
  { label: "Púrpura", style: "PURPLE_TEXT" },
  { label: "Amarillo", style: "YELLOW_TEXT" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RichTextEditor;
