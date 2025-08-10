import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ForumIndex() {
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        fetch("/api/posts", { cache: "no-store" })
            .then(async (r) => {
                if (!r.ok) throw new Error(`GET /api/posts -> ${r.status}`);
                return r.json();
            })
            .then((data) => mounted && setPosts(data))
            .catch((e) => setError(String(e?.message || e)));
        return () => { mounted = false; };
    }, []);

    if (error) return <div className="container mx-auto p-6">Error: {error}</div>;
    if (!posts) return <div className="container mx-auto p-6">Loading…</div>;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Forum</h1>
                <Link to="/forum/new" className="btn btn-primary">New Post</Link>
            </div>

            {posts.length === 0 ? (
                <p className="opacity-70">No posts yet. Be the first!</p>
            ) : (
                <ul className="space-y-3">
                    {posts.map((p) => (
                        <li key={p._id} className="bg-base-200 rounded-lg p-4 border">
                            <Link to={`/forum/${p._id}`} className="text-lg font-semibold hover:underline">
                                {p.title}
                            </Link>
                            <div className="mt-1 text-sm opacity-80 line-clamp-2">{p.body}</div>
                            <div className="mt-2 text-xs opacity-60 flex items-center gap-3">
                                <span>{new Date(p.createdAt).toLocaleString()}</span>
                                <span>•</span>
                                <span>{p.repliesCount} repl{p.repliesCount === 1 ? "y" : "ies"}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
