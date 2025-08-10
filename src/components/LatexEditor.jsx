import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { history } from "@codemirror/commands";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

function LatexEditor({ value, onChange, isEditing }) {
  if (isEditing) {
    return (
      <CodeMirror
        value={value}
        height="400px"
        basicSetup={{ lineNumbers: false, foldGutter: false }}
        extensions={[StreamLanguage.define(stex), keymap.of(defaultKeymap), history()]}
        onChange={onChange}
        autoFocus
      />
    );
  }

  // When not editing, show KaTeX-rendered output
  return (
    <div style={{ minHeight: 100, cursor: "pointer" }}>
      {value ? (
        <BlockMath math={value} errorColor="#cc0000" />
      ) : (
        <em style={{ color: "#888" }}>Click to edit</em>
      )}
    </div>
  );
}

export default LatexEditor;
