import { useEffect, useMemo, useState } from "react";

/* ---------- Suggestion content ---------- */
const SUGGESTIONS = [
    "Explain this code and suggest improvements.",
    "Find the bug and propose a minimal fix.",
    "Give step-by-step hints (no full solution).",
    "Generate tests: typical, edge, and adversarial.",
    "Explain time and space complexity.",
    "Refactor to be more readable and idiomatic.",
];

const BUILDER_PRESETS = [
    { key: "steps", label: "Step-by-step" },
    { key: "edge", label: "Edge cases" },
    { key: "bigO", label: "Big-O" },
    { key: "tests", label: "Unit tests" },
    { key: "concise", label: "Concise" },
];

/* ---------- Local storage helpers ---------- */
const FAVORITES_KEY = "cshelper.ai.prompts.favorites";
const HISTORY_KEY = "cshelper.ai.history";

function load(key, fallback) {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch {
        return fallback;
    }
}
function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch { }
}

/* ---------- Hooks ---------- */
function useFavorites() {
    const [favorites, setFavorites] = useState(() => load(FAVORITES_KEY, []));
    useEffect(() => save(FAVORITES_KEY, favorites), [favorites]);
    const isFav = (t) => favorites.includes(t);
    const toggle = (t) =>
        setFavorites((f) => (f.includes(t) ? f.filter((x) => x !== t) : [...f, t]));
    return { favorites, isFav, toggle };
}

function useHistory(limit = 10) {
    const [history, setHistory] = useState(() => load(HISTORY_KEY, []));
    useEffect(() => save(HISTORY_KEY, history), [history]);
    const push = (q, a) =>
        setHistory((h) => [{ id: Date.now(), q, a }, ...h].slice(0, limit));
    const clear = () => setHistory([]);
    return { history, push, clear };
}

/* ---------- Page ---------- */
export default function AiHelp() {
    const [question, setQuestion] = useState("");
    const [context, setContext] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [builder, setBuilder] = useState({
        steps: true,
        edge: true,
        bigO: true,
        tests: false,
        concise: false,
    });

    const { favorites, isFav, toggle } = useFavorites();
    const { history, push: pushHistory, clear: clearHistory } = useHistory(10);

    const builderText = useMemo(() => {
        const bits = [];
        if (builder.steps) bits.push("Explain step-by-step.");
        if (builder.edge) bits.push("Include edge cases and failure modes.");
        if (builder.bigO) bits.push("Provide time and space complexity.");
        if (builder.tests) bits.push("Suggest unit tests: typical, edge, adversarial.");
        if (builder.concise) bits.push("Keep the answer concise.");
        return bits.join(" ");
    }, [builder]);

    const insertSuggestion = (t) =>
        setQuestion((q) => (q ? `${q}\n\n${t}` : t));

    const copy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch { }
    };

    const ask = async (e) => {
        e?.preventDefault();
        if (!question.trim()) return;

        setLoading(true);
        setError("");
        setAnswer("");

        const built = builderText ? `${question}\n\n${builderText}` : question;

        try {
            const r = await fetch("/api/ai/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: built, context }),
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data?.message || `HTTP ${r.status}`);
            setAnswer(data.text || "");
            pushHistory(built, data.text || "");
        } catch (err) {
            setError(err.message || "Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-4 pt-24 pb-24">
            <div className="mx-auto w-full max-w-3xl space-y-8">
                {/* Header */}
                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">AI Help</h1>
                    <p className="opacity-70">
                        Ask CSHelper questions about your code, errors, or problems. Choose a prompt or craft your own.
                    </p>
                </header>

                {/* Suggestions */}
                {(!answer && !question.trim()) && (
                    <>
                        {favorites.length > 0 && (
                            <section>
                                <h2 className="text-sm uppercase tracking-wide opacity-70 mb-2">
                                    Favorites
                                </h2>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {favorites.map((t) => (
                                        <SuggestionCard
                                            key={t}
                                            text={t}
                                            onClick={() => insertSuggestion(t)}
                                            favorite
                                            onToggleFavorite={() => toggle(t)}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        <section>
                            <h2 className="text-sm uppercase tracking-wide opacity-70 mb-2">
                                Try one of these
                            </h2>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {SUGGESTIONS.map((t) => (
                                    <SuggestionCard
                                        key={t}
                                        text={t}
                                        onClick={() => insertSuggestion(t)}
                                        favorite={isFav(t)}
                                        onToggleFavorite={() => toggle(t)}
                                    />
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {/* Prompt Builder (pills) */}
                <section className="bg-base-200 border rounded-2xl p-4">
                    <div className="text-sm font-medium mb-2">Prompt Builder</div>
                    <div className="flex flex-wrap gap-2">
                        {BUILDER_PRESETS.map((p) => (
                            <button
                                key={p.key}
                                type="button"
                                onClick={() => setBuilder((b) => ({ ...b, [p.key]: !b[p.key] }))}
                                className={`btn btn-xs rounded-full ${builder[p.key] ? "btn-primary" : "btn-outline"
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                    {builderText && (
                        <div className="mt-3 text-xs opacity-70 leading-relaxed">
                            Will append:&nbsp;
                            <span className="font-mono">{builderText}</span>
                        </div>
                    )}
                </section>

                {/* Main input card */}
                <section className="bg-base-200 border rounded-2xl p-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Your question</label>
                        <textarea
                            className="textarea textarea-bordered w-full h-32 text-base leading-relaxed"
                            placeholder="e.g., Why is my binary search off-by-one? Show a failing case and fix."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) ask(e);
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Optional context
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full h-32 font-mono text-sm leading-relaxed"
                            placeholder="// paste code, problem text, or error logs here"
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="btn btn-primary" onClick={ask} disabled={loading}>
                            {loading ? "Thinking…" : "Ask"}
                        </button>
                        <button
                            className="btn btn-ghost"
                            onClick={() => {
                                setQuestion("");
                                setContext("");
                                setAnswer("");
                                setError("");
                            }}
                            disabled={loading}
                        >
                            Clear
                        </button>
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            <span>{error}</span>
                        </div>
                    )}
                </section>

                {/* Answer card */}
                {answer && (
                    <section className="bg-base-200 border rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">Answer</div>
                            <div className="flex gap-2">
                                <button className="btn btn-xs" onClick={() => copy(answer)}>
                                    Copy
                                </button>
                                <button
                                    className="btn btn-xs btn-ghost"
                                    onClick={() => {
                                        // ask same question again (useful after billing/rate issues)
                                        setAnswer("");
                                        setError("");
                                        ask();
                                    }}
                                    disabled={loading}
                                >
                                    Regenerate
                                </button>
                            </div>
                        </div>
                        <div className="whitespace-pre-wrap leading-relaxed">{answer}</div>
                    </section>
                )}

                {/* History */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm uppercase tracking-wide opacity-70">
                            Recent
                        </h2>
                        <button
                            className="btn btn-xs btn-ghost"
                            onClick={clearHistory}
                            disabled={!history.length}
                        >
                            Clear history
                        </button>
                    </div>

                    {history.length === 0 ? (
                        <p className="opacity-60">No recent questions yet.</p>
                    ) : (
                        <ul className="space-y-3">
                            {history.map((h) => (
                                <li key={h.id} className="bg-base-200 border rounded-2xl p-4">
                                    <div className="text-xs font-semibold opacity-70 mb-1">Q</div>
                                    <div className="whitespace-pre-wrap leading-relaxed">{h.q}</div>
                                    {h.a && (
                                        <>
                                            <div className="text-xs font-semibold opacity-70 mt-3 mb-1">
                                                A
                                            </div>
                                            <div className="whitespace-pre-wrap leading-relaxed">
                                                {h.a}
                                            </div>
                                        </>
                                    )}
                                    <div className="mt-3 flex gap-2">
                                        <button
                                            className="btn btn-xs"
                                            onClick={() => {
                                                setQuestion(h.q);
                                                setAnswer("");
                                                setError("");
                                                window.scrollTo({ top: 0, behavior: "smooth" });
                                            }}
                                        >
                                            Reuse Question
                                        </button>
                                        <button className="btn btn-xs" onClick={() => copy(h.a || "")}>
                                            Copy Answer
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
}

/* ---------- UI bits ---------- */
function SuggestionCard({ text, onClick, favorite, onToggleFavorite }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group text-left p-5 rounded-2xl bg-base-200 border hover:bg-base-300 transition flex items-start justify-between gap-3"
        >
            <span className="leading-relaxed">{text}</span>
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite?.();
                }}
                title={favorite ? "Unfavorite" : "Favorite"}
                className={`text-sm select-none ${favorite ? "text-yellow-400" : "opacity-40 group-hover:opacity-70"}`}
            >
                ⭐
            </span>
        </button>
    );
}
