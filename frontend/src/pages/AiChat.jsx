import { useEffect, useMemo, useRef, useState } from "react";

const SUGGESTIONS = [
    "Explain this code and suggest improvements.",
    "Find the bug and propose a minimal fix.",
    "Give me step-by-step hints (no full solution) for my problem.",
    "Generate tests: typical, edge, and adversarial cases.",
    "Explain time and space complexity for this approach.",
    "Refactor to be more readable and idiomatic in this language."
];

const DEFAULT_SYSTEM =
    "You are CSHelper, a helpful coding tutor. Be clear, concise, and practical. "
    + "Show steps when helpful, call out edge cases, and keep examples small.";

export default function AiChat() {
    const [messages, setMessages] = useState([]); // {id, role: "user"|"assistant", content}
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [model, setModel] = useState("gpt-4o-mini");
    const [temperature, setTemperature] = useState(0.2);

    const endRef = useRef(null);

    // Scroll to bottom when new messages arrive
    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    const canSend = input.trim().length > 0 && !loading;

    const send = async (e) => {
        e?.preventDefault();
        if (!canSend) return;

        setError("");
        setLoading(true);

        const newUserMsg = { id: Date.now(), role: "user", content: input.trim() };
        const next = [...messages, newUserMsg];
        setMessages(next);
        setInput("");

        try {
            const r = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system: DEFAULT_SYSTEM,
                    model,
                    temperature,
                    messages: next.map(({ role, content }) => ({ role, content })),
                }),
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data?.message || `HTTP ${r.status}`);
            const reply = data.text || "";
            setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", content: reply }]);
        } catch (e2) {
            setError(e2.message || "Failed");
            // add an assistant bubble with the error so it stays in the transcript
            setMessages((m) => [
                ...m,
                { id: Date.now() + 2, role: "assistant", content: `⚠️ ${e2.message || "Failed"}` },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const newChat = () => { setMessages([]); setInput(""); setError(""); };

    const insertSuggestion = (text) => {
        setInput((v) => (v ? v + "\n" + text : text));
    };

    const copyText = async (text) => {
        try { await navigator.clipboard.writeText(text); } catch { }
    };

    return (
        <div className="flex">
            {/* Main column */}
            <div className="flex-1">
                <div className="container mx-auto max-w-3xl px-4 pt-20 pb-28">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl sm:text-3xl font-bold">AI</h1>
                        <div className="flex items-center gap-2">
                            <select
                                className="select select-bordered select-sm"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                title="Model"
                            >
                                <option value="gpt-4o-mini">gpt-4o-mini</option>
                            </select>
                            <select
                                className="select select-bordered select-sm"
                                value={String(temperature)}
                                onChange={(e) => setTemperature(Number(e.target.value))}
                                title="Creativity"
                            >
                                <option value="0.0">Precise (0.0)</option>
                                <option value="0.2">Balanced (0.2)</option>
                                <option value="0.5">Creative (0.5)</option>
                            </select>
                            <button className="btn btn-sm" onClick={newChat} disabled={loading}>New Chat</button>
                        </div>
                    </div>

                    {/* Empty state: suggestion cards */}
                    {messages.length === 0 && (
                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                            {SUGGESTIONS.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => insertSuggestion(s)}
                                    className="text-left p-4 rounded-xl bg-base-200 border hover:bg-base-300 transition"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Conversation */}
                    <div className="space-y-4">
                        {messages.map((m) => (
                            <MessageBubble
                                key={m.id}
                                role={m.role}
                                content={m.content}
                                onCopy={() => copyText(m.content)}
                            />
                        ))}
                        <div ref={endRef} />
                    </div>

                    {/* Error banner */}
                    {error && (
                        <div className="alert alert-error mt-4">
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Sticky input like ChatGPT */}
                <div className="fixed bottom-0 left-0 right-0 bg-base-100/80 backdrop-blur border-t">
                    <div className="container mx-auto max-w-3xl px-4 py-3">
                        <form onSubmit={send} className="space-y-2">
                            <textarea
                                className="textarea textarea-bordered w-full h-24 md:h-28"
                                placeholder="Message CSHelper… (Shift+Enter for newline)"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        send();
                                    }
                                }}
                            />
                            <div className="flex items-center justify-between">
                                <div className="text-xs opacity-70">
                                    Your messages may be reviewed to improve the model. Don't share sensitive info.
                                </div>
                                <button className="btn btn-primary" disabled={!canSend}>
                                    {loading ? "Sending…" : "Send"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* (Optional) Right rail with fast actions — comment out if you don’t want it */}
            {/* <aside className="hidden xl:block w-80 border-l pt-20 p-4">
        <div className="text-sm opacity-80 mb-2">Quick Actions</div>
        <div className="space-y-2">
          <button className="btn btn-sm w-full" onClick={() => insertSuggestion("Summarize this code in 5 bullets.")}>Summarize</button>
          <button className="btn btn-sm w-full" onClick={() => insertSuggestion("Generate table-driven unit tests.")}>Generate tests</button>
          <button className="btn btn-sm w-full" onClick={() => insertSuggestion("Find edge cases and defensive checks.")}>Edge cases</button>
        </div>
      </aside> */}
        </div>
    );
}

/* Message bubble component */
function MessageBubble({ role, content, onCopy }) {
    const isUser = role === "user";
    return (
        <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                    <img
                        alt={isUser ? "You" : "AI"}
                        src={isUser ? "/avatar.png" : "/bot.png"}
                    />
                </div>
            </div>
            <div className={`chat-bubble max-w-[90%] md:max-w-[80%] ${isUser ? "chat-bubble-primary" : ""}`}>
                <div className="whitespace-pre-wrap">{content}</div>
                <div className="mt-1 text-[10px] opacity-60">
                    {isUser ? "You" : "CSHelper"}
                </div>
            </div>
            {!isUser && (
                <button className="btn btn-xs btn-ghost self-end ml-2" onClick={onCopy}>
                    Copy
                </button>
            )}
        </div>
    );
}
