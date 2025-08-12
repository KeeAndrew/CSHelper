import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true); setError("");
        try {
            const r = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // include cookies if your auth uses them
                body: JSON.stringify({ title, body }),
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data?.message || "Failed to create post");
            navigate(`/forum/${data._id}`);
        } catch (e) {
            setError(String(e?.message || e));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">New Post</h1>
            {error && <p className="text-error mb-2">{error}</p>}
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={160}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Body</label>
                    <textarea
                        className="textarea textarea-bordered w-full h-48"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Posting…" : "Submit"}
                </button>
            </form>
        </div>
    );
}
