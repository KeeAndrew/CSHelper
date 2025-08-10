import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/ai/ask  { question, context? }
export const askAI = async (req, res) => {
    try {
        const { question, context = "" } = req.body || {};
        if (!question || !question.trim()) {
            return res.status(400).json({ message: "question is required" });
        }
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ message: "OPENAI_API_KEY missing on server" });
        }

        const system =
            "You are CSHelper, a friendly CS tutor. Be clear, concise, include edge cases, and show steps when useful.";

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.2,
            messages: [
                { role: "system", content: system },
                ...(context ? [{ role: "user", content: `Context:\n${context}` }] : []),
                { role: "user", content: question },
            ],
        });

        const text = completion?.choices?.[0]?.message?.content ?? "";
        res.json({ ok: true, text });
    } catch (err) {
        console.error("AI /ask error:", err?.status || err?.response?.status, err?.message || err);
        res
            .status(err?.status || err?.response?.status || 500)
            .json({ message: err?.message || "AI request failed" });
    }
};
// --- add below your existing imports/client and askAI ---
export const chatAI = async (req, res) => {
    try {
        const { messages = [], model = "gpt-4o-mini", temperature = 0.2, system } = req.body || {};

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ message: "messages[] is required" });
        }
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ message: "OPENAI_API_KEY missing on server" });
        }

        const convo = [];
        if (system?.trim()) convo.push({ role: "system", content: system });
        for (const m of messages) {
            if (!m?.role || !m?.content) continue;
            // only allow roles we expect
            const role = m.role === "assistant" ? "assistant" : "user";
            convo.push({ role, content: String(m.content) });
        }

        const completion = await client.chat.completions.create({
            model,
            temperature,
            messages: convo,
        });

        const text = completion?.choices?.[0]?.message?.content ?? "";
        res.json({ ok: true, text });
    } catch (err) {
        console.error("AI /chat error:", err?.status || err?.response?.status, err?.message || err);
        res
            .status(err?.status || err?.response?.status || 500)
            .json({ message: err?.message || "AI chat failed" });
    }
};
