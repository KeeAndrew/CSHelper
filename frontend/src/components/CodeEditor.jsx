import { useCallback, forwardRef, useImperativeHandle, useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = forwardRef(function CodeEditor(
    { value, onChange, language = "javascript", height = 520, readOnly = false },
    ref
) {
    const editorRef = useRef(null);

    const handleMount = useCallback((editor, monaco) => {
        editorRef.current = editor;

        // VS Code-ish dark theme
        monaco.editor.defineTheme("cshelper-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
                "editor.background": "#1e1e1e",
                "editorGutter.background": "#1e1e1e",
                "editor.lineHighlightBackground": "#2a2a2a50",
                "editorLineNumber.foreground": "#858585",
                "editorCursor.foreground": "#AEAFAD",
                "editor.selectionBackground": "#264F78",
                "editor.inactiveSelectionBackground": "#3A3D41",
                "scrollbarSlider.background": "#79797966",
                "scrollbarSlider.hoverBackground": "#646464b3",
                "scrollbarSlider.activeBackground": "#BFBFBF80",
            },
        });
        monaco.editor.setTheme("cshelper-dark");
    }, []);

    // Expose a simple .format() that uses Monaco's built-in formatter (JS only)
    useImperativeHandle(ref, () => ({
        format: () => editorRef.current?.getAction("editor.action.formatDocument")?.run(),
    }));

    return (
        <div className="rounded-xl overflow-hidden border border-base-300">
            <Editor
                value={value}
                onChange={(v) => onChange?.(v ?? "")}
                language={language}
                height={height}
                theme="cshelper-dark"
                options={{
                    readOnly,
                    // Make it feel "auto"
                    formatOnPaste: true,
                    formatOnType: true,

                    fontFamily:
                        'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    fontLigatures: true,
                    fontSize: 14,
                    lineNumbers: "on",
                    folding: true,
                    minimap: { enabled: true },
                    smoothScrolling: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    renderWhitespace: "selection",
                    tabSize: 2,
                    bracketPairColorization: { enabled: true },
                    guides: { bracketPairs: true, indentation: true },
                    padding: { top: 12, bottom: 12 },
                }}
                onMount={handleMount}
            />
        </div>
    );
});

export default CodeEditor;
