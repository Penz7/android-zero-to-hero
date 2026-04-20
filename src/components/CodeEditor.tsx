"use client";

import { useRef, useEffect, useCallback } from "react";
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { syntaxHighlighting, HighlightStyle, indentOnInput, bracketMatching } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// Kotlin syntax highlight theme (One Dark style)
const kotlinHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#c678dd" },
  { tag: tags.operatorKeyword, color: "#c678dd" },
  { tag: tags.definitionKeyword, color: "#c678dd" },
  { tag: tags.string, color: "#98c379" },
  { tag: tags.comment, color: "#5c6370", fontStyle: "italic" },
  { tag: tags.number, color: "#d19a66" },
  { tag: tags.bool, color: "#d19a66" },
  { tag: tags.null, color: "#d19a66" },
  { tag: tags.function(tags.variableName), color: "#61afef" },
  { tag: tags.typeName, color: "#e5c07b" },
  { tag: tags.className, color: "#e5c07b" },
  { tag: tags.propertyName, color: "#e06c75" },
  { tag: tags.operator, color: "#56b6c2" },
  { tag: tags.punctuation, color: "#abb2bf" },
  { tag: tags.variableName, color: "#e06c75" },
  { tag: tags.atom, color: "#d19a66" },
]);

// Kotlin language definition using StreamLanguage
import { StreamLanguage } from "@codemirror/language";
import { foldGutter, indentUnit } from "@codemirror/language";

const kotlinLang = StreamLanguage.define({
  name: "kotlin",
  startState() {
    return { inString: false, stringChar: "", inBlock: false };
  },
  token(stream, state) {
    // Comments
    if (stream.match(/\/\//)) {
      stream.skipToEnd();
      return "comment";
    }
    if (stream.match(/\/\*/)) {
      state.inBlock = true;
      return "comment";
    }
    if (state.inBlock) {
      if (stream.match(/\*\//)) {
        state.inBlock = false;
      } else {
        stream.next();
      }
      return "comment";
    }

    // Strings
    if (stream.match(/"""/)) {
      // Triple-quoted string - skip to end
      const idx = stream.string.indexOf('"""', stream.pos);
      if (idx !== -1) {
        stream.pos = idx + 3;
      } else {
        stream.skipToEnd();
      }
      return "string";
    }

    if (!state.inString && (stream.peek() === '"' || stream.peek() === "'")) {
      state.inString = true;
      state.stringChar = stream.peek() as string;
      stream.next();
      return "string";
    }
    if (state.inString) {
      if (stream.peek() === state.stringChar) {
        stream.next();
        state.inString = false;
        return "string";
      }
      if (stream.peek() === "\\") {
        stream.next();
        stream.next();
        return "string";
      }
      stream.next();
      return "string";
    }

    // Whitespace
    if (stream.eatSpace()) return null;

    // Numbers
    if (stream.match(/^-?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?[fFLl]?/)) {
      return "number";
    }

    // Annotations
    if (stream.match(/@[a-zA-Z_][a-zA-Z0-9_]*/)) {
      return "meta";
    }

    // Keywords
    if (stream.match(/\b(fun|val|var|class|object|interface|enum|sealed|data|when|if|else|for|while|do|return|break|continue|try|catch|finally|throw|import|package|as|is|in|by|constructor|init|companion|override|open|abstract|private|public|protected|internal|suspend|inline|reified|out|super|this|null|true|false|it|lazy|lateinit|get|set|where|typealias|annotation|crossinline|noinline|vararg|tailrec|operator|infix|external|actual|expect|value|inner|data)\b/)) {
      return "keyword";
    }

    // Types (uppercase start)
    if (stream.match(/\b[A-Z][a-zA-Z0-9_]*\b/)) {
      return "typeName";
    }

    // Function calls
    if (stream.match(/[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/)) {
      return "function";
    }

    // Identifiers
    if (stream.match(/[a-zA-Z_][a-zA-Z0-9_]*/)) {
      return "variableName";
    }

    // Operators
    if (stream.match(/[+\-*/%=<>!&|^~?]+/)) {
      return "operator";
    }

    // Punctuation
    if (stream.match(/[{}()\[\];,.]/)) {
      return "punctuation";
    }

    stream.next();
    return null;
  },
});

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  height?: string;
}

export default function CodeEditor({ code, onChange, height = "280px" }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current(update.state.doc.toString());
      }
    });

    const theme = EditorView.theme({
      "&": {
        height: height,
        fontSize: "14px",
        backgroundColor: "#1e1e2e",
        borderRadius: "0 0 8px 8px",
      },
      ".cm-scroller": {
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        overflow: "auto",
      },
      ".cm-content": {
        caretColor: "#528bff",
        padding: "8px 0",
      },
      ".cm-gutters": {
        backgroundColor: "#1e1e2e",
        color: "#546178",
        border: "none",
      },
      ".cm-activeLineGutter": {
        backgroundColor: "#2c313c",
      },
      ".cm-activeLine": {
        backgroundColor: "#2c313c44",
      },
      "&.cm-focused .cm-cursor": {
        borderLeftColor: "#528bff",
      },
      "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
        backgroundColor: "#3e4451",
      },
    });

    const state = EditorState.create({
      doc: code,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        history(),
        indentOnInput(),
        bracketMatching(),
        foldGutter(),
        indentUnit.of("    "),
        kotlinLang,
        syntaxHighlighting(kotlinHighlight),
        theme,
        updateListener,
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []); // Only init once

  // Update editor content when code prop changes externally
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const currentCode = view.state.doc.toString();
    if (currentCode !== code) {
      view.dispatch({
        changes: { from: 0, to: currentCode.length, insert: code },
      });
    }
  }, [code]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-b-lg border border-t-0 border-[#3b4050]"
    />
  );
}
