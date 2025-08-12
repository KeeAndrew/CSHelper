import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ForumIndex() {
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        setError("");
        fetch("/api/posts", { cache: "no-store", credentials: "include" })
            .then(async (r) => {
                if (!r.ok) throw new Error(`GET /api/posts -> ${r.status}`);
                return r.json();
            })
            .then((json) => mounted && setPosts(json))
            .catch((e) => setError(String(e?.message || e)));
        return () => (mounted = false);
    }, []);

    if (error) return <div className="container mx-auto p-6 pt-20">Error: {error}</div>;
    if (!posts) return <div className="container mx-auto p-6 pt-20">Loading…</div>;

    return (
        <div className="container mx-auto p-6 pt-20 max-w-4xl">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Forum</h1>
                <Link to="/forum/new" className="btn btn-primary">New Post</Link>
            </div>

            {posts.length === 0 ? (
                <p className="opacity-70">No posts yet.</p>
            ) : (
                <ul className="space-y-3">
                    {posts.map((p) => (
                        <li key={p._id} className="bg-base-200 border rounded-lg p-4">
                            <Link to={`/forum/${p._id}`} className="text-lg font-semibold hover:underline">
                                {p.title}
                            </Link>
                            <div className="text-xs opacity-70">
                                by {p.user?.fullName || "Unknown"} • {new Date(p.createdAt).toLocaleString()}
                            </div>
                            <div className="text-sm opacity-80 mt-1 line-clamp-2">{p.body}</div>
                            <div className="text-xs opacity-60 mt-1">
                                {p.repliesCount || 0} replies
                                {Array.isArray(p.attachments) && p.attachments.length > 0
                                    ? ` • ${p.attachments.length} attachment${p.attachments.length > 1 ? "s" : ""}`
                                    : ""}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
