import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
function javaAllman(source = "") {
    let s = source.replace(/\r\n?/g, "\n");

    // Put "{" on its own line and ensure a newline after it
    s = s.replace(/([^\s\{\n])\s*\{(?!\n)/g, "$1\n{");
    s = s.replace(/\{\s*(?=\S)/g, "{\n");

    // Ensure "}" is on its own line:
    // 1) newline BEFORE "}" if there's code before it on the same line
    s = s.replace(/([^\s\n])\s*\}(?!\n)/g, "$1\n}");
    // 2) newline AFTER "}" if something non-space follows
    s = s.replace(/\}\s*(?=\S)/g, "}\n");

    // Collapse extra blank lines
    s = s.replace(/\n{3,}/g, "\n\n");

    // Simple indentation pass
    const lines = s.split("\n");
    let indent = 0;
    const out = [];
    for (const raw of lines) {
        const line = raw.trim();
        const leadingCloses = (line.match(/^\}+/) || [""])[0].length;
        indent = Math.max(0, indent - leadingCloses);
        out.push(line ? "    ".repeat(indent) + line : "");
        if (line.endsWith("{")) indent++;
    }
    return out.join("\n");
}



export default function ProblemDetail() {
    const editorRef = useRef(null);
    const { id } = useParams();
    const [prob, setProb] = useState(null);
    const [lang, setLang] = useState("javascript");
    const [code, setCode] = useState("");
    const [results, setResults] = useState(null);
    const [error, setError] = useState("");
    const [running, setRunning] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let mounted = true;
        setProb(null); setResults(null); setError("");
        fetch(`/api/problems/${id}`, { cache: "no-store" })
            .then(async (r) => {
                if (!r.ok) throw new Error(`GET /api/problems/${id} -> ${r.status}`);
                return r.json();
            })
            .then((p) => { if (mounted) setProb(p); })
            .catch((e) => { console.error(e); setError(String(e?.message || e)); });
        return () => { mounted = false; };
    }, [id]);

    const variants = useMemo(
        () => (prob && Array.isArray(prob.variants) ? prob.variants : []),
        [prob]
    );
    const variant = useMemo(() => {
        if (!variants.length) return null;
        return variants.find((v) => v.lang === lang) || variants[0];
    }, [variants, lang]);

    useEffect(() => {
        if (!variants.length) return;
        if (!variants.find((v) => v.lang === lang)) {
            setLang(variants[0].lang);
            const init = variants[0].starterCode || "";
            setCode(variants[0].lang === "java" ? javaAllman(init) : init);
        } else if (variant) {
            const init = variant.starterCode || "";
            setCode(lang === "java" ? javaAllman(init) : init);
        }
    }, [variants, lang, variant]);

    const runTests = async () => {
        if (!prob || !variant) return;
        setRunning(true); setError(""); setResults(null);
        try {
            if (lang === "javascript") {
                const out = runJS(code, variant.functionName, prob.tests || []);
                setResults(out);
            } else if (lang === "python") {
                const out = await runPy(code, variant.functionName, prob.tests || []);
                setResults(out);
            } else if (lang === "java") {
                const resp = await fetch("/api/judge-java/run", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        code,
                        functionName: variant.functionName,
                        tests: prob.tests || []
                    })
                });
                const data = await resp.json();
                if (!resp.ok) throw new Error(data.message || "Java run failed");
                if (data.compileError) throw new Error("Compile error:\n" + data.compileError);
                if (data.runtimeError) throw new Error("Runtime error:\n" + data.runtimeError);
                setResults(data);
            }
        } catch (e) {
            setError(String(e?.message || e));
        } finally {
            setRunning(false);
        }
    };

    const copySolution = async () => {
        if (!variant?.optimalSolution) return;
        try { await navigator.clipboard.writeText(variant.optimalSolution); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch { }
    };

    if (error && !prob) {
        return (
            <div className="container mx-auto p-6 max-w-3xl">
                <p className="text-error mb-4">Failed to load problem: {error}</p>
                <Link className="btn btn-sm" to="/problems">Back to Problems</Link>
            </div>
        );
    }
    if (!prob) return <div className="container mx-auto p-6">Loading…</div>;

    const hasVariants = variants.length > 0;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">{prob.title}</h1>
            {prob.level && <div className="mb-1 text-sm opacity-70 uppercase">{prob.level}</div>}
            {prob.description && <p className="mb-4 opacity-90">{prob.description}</p>}

            {Array.isArray(prob.examples) && prob.examples.length > 0 && (
                <div className="bg-base-200 rounded-lg p-4 mb-5">
                    <h3 className="text-lg font-semibold mb-2">Examples</h3>
                    <ul className="space-y-3">
                        {prob.examples.map((ex, i) => (
                            <li key={i} className="p-3 rounded-md bg-base-100 border">
                                <div><span className="font-medium">Input:</span> <code>{ex.input}</code></div>
                                <div><span className="font-medium">Output:</span> <code>{ex.output}</code></div>
                                {ex.explanation && <div className="opacity-80 mt-1">{ex.explanation}</div>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Language selector */}
            {hasVariants && (
                <div className="flex items-center gap-2 mb-2">
                    <span className="opacity-70">Language:</span>
                    <select
                        className="select select-bordered select-sm"
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                    >
                        {variants.map(v => (
                            <option key={v.lang} value={v.lang}>{cap(v.lang)}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Editor */}
            {variant && (
                <>
                    <h2 className="text-xl font-semibold mt-2 mb-2">
                        Your Code ({variant.functionName})
                    </h2>

                    <CodeEditor
                        ref={editorRef}
                        language={lang}
                        value={code}
                        onChange={setCode}
                        height={520}
                    />


                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <button className="btn btn-primary" onClick={runTests} disabled={running}>
                            {running ? "Running…" : "Run Tests"}
                        </button>
                        <button className="btn btn-ghost" onClick={() => setCode(variant.starterCode || "")} disabled={running}>
                            Reset to Starter
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                if (lang === "java") {
                                    setCode((c) => javaAllman(c));     // force Java to Allman style
                                } else {
                                    editorRef.current?.format?.();     // use Monaco's built-in for JS/Py
                                }
                            }}
                            disabled={running}
                        >
                            Format
                        </button>
                        <button className="btn btn-accent" onClick={() => setShowSolution(v => !v)}>
                            {showSolution ? "Hide Optimal Solution" : "Show Optimal Solution"}
                        </button>
                    </div>

                    {showSolution && (
                        <div className="mt-5 bg-base-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">Optimal Solution</h3>
                                <div className="text-sm opacity-80">
                                    <span className="mr-3"><strong>Time:</strong> {variant.complexity?.time || "-"}</span>
                                    <span><strong>Space:</strong> {variant.complexity?.space || "-"}</span>
                                </div>
                            </div>
                            <pre className="bg-base-100 border rounded-lg p-3 overflow-auto">
                                <code>{variant.optimalSolution}</code>
                            </pre>
                            <button className="btn btn-sm mt-3" onClick={copySolution}>
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Results */}
            {error && <p className="text-error mt-3 whitespace-pre-wrap">{error}</p>}
            {results && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">
                        Results: {results.passed}/{results.total} passed
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Input</th>
                                    <th>Expected</th>
                                    <th>Output</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.results.map((r, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td><code>{pretty(r.input)}</code></td>
                                        <td><code>{pretty(r.expected)}</code></td>
                                        <td><code>{pretty(r.output)}</code></td>
                                        <td>{r.error ? `Error: ${r.error}` : (r.pass ? "✅" : "❌")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ---------- JS runner ---------- */
function runJS(code, functionName, tests) {
    const fn = new Function(`${code}\nreturn ${functionName};`)();
    if (typeof fn !== "function") throw new Error(`Function "${functionName}" was not defined`);
    const results = (tests || []).map(t => {
        const args = JSON.parse(t.input);
        const expected = JSON.parse(t.expected);
        let output, err = null, pass = false;
        try { output = Array.isArray(args) ? fn(...args) : fn(args); pass = deepEqual(output, expected); }
        catch (e) { err = String(e?.message || e); }
        return { input: args, expected, output, pass, error: err };
    });
    return { results, passed: results.filter(r => r.pass).length, total: results.length };
}

/* ---------- Python runner (Pyodide) ---------- */
async function runPy(code, functionName, tests) {
    const py = await loadPyodideOnce();
    const program = `
import json
${code}

def __run(tests_json):
  tests = json.loads(tests_json)
  res = []
  def deep_equal(a,b): return json.dumps(a, sort_keys=True) == json.dumps(b, sort_keys=True)
  for t in tests:
    args = json.loads(t["input"])
    expected = json.loads(t["expected"])
    try:
      if isinstance(args, list):
        out = ${functionName}(*args)
      else:
        out = ${functionName}(args)
      ok = deep_equal(out, expected)
      res.append({"input": args, "expected": expected, "output": out, "pass": ok, "error": None})
    except Exception as e:
      res.append({"input": args, "expected": expected, "output": None, "pass": False, "error": str(e)})
  return json.dumps({"results": res, "passed": len([r for r in res if r["pass"]]), "total": len(res)})
`;
    py.runPython(program);
    const json = py.runPython(`__run(${JSON.stringify(JSON.stringify(tests || []))})`);
    return JSON.parse(json);
}

function loadPyodideOnce() {
    if (window.__pyodideReady) return window.__pyodideReady;
    window.__pyodideReady = new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
        s.onload = async () => {
            try {
                const py = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/" });
                resolve(py);
            } catch (e) { reject(e); }
        };
        s.onerror = reject;
        document.body.appendChild(s);
    });
    return window.__pyodideReady;
}
function quickTidy(code, lang) {
    if (lang === "java") {
        // put "{" on its own line and "}" on its own line; simple indent is left to Monaco styling
        return (code || "")
            .replace(/\r\n?/g, "\n")
            .replace(/([^\s\{\n])\s*\{\s*/g, "$1\n{")
            .replace(/\}\s*(?=\S)/g, "}\n")
            .replace(/\n{3,}/g, "\n\n");
    }
    if (lang === "python") {
        // convert tabs to 4 spaces and trim trailing spaces
        return (code || "")
            .replace(/\r\n?/g, "\n")
            .replace(/\t/g, "    ")
            .split("\n")
            .map((l) => l.replace(/[ \t]+$/g, ""))
            .join("\n");
    }
    return code || "";
}

/* ---------- utils ---------- */
function deepEqual(a, b) { try { return JSON.stringify(a) === JSON.stringify(b); } catch { return false; } }
function pretty(v) { try { return typeof v === "string" ? v : JSON.stringify(v); } catch { return String(v); } }
function cap(s) { return s[0].toUpperCase() + s.slice(1); }
