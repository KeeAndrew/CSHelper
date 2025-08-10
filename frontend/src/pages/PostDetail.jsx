import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useAuthStore();
    const [data, setData] = useState(null); // { post, replies }
    const [error, setError] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        let mounted = true;
        setData(null); setError("");
        fetch(`/api/posts/${id}`, { cache: "no-store" })
            .then(async (r) => {
                if (!r.ok) throw new Error(`GET /api/posts/${id} -> ${r.status}`);
                return r.json();
            })
            .then((json) => mounted && setData(json))
            .catch((e) => setError(String(e?.message || e)));
        return () => { mounted = false; };
    }, [id]);

    const sendReply = async (e) => {
        e.preventDefault();
        if (!reply.trim()) return;
        setLoading(true); setError("");
        try {
            const r = await fetch(`/api/posts/${id}/replies`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ body: reply }),
            });
            const json = await r.json();
            if (!r.ok) throw new Error(json?.message || "Failed to reply");
            setData((d) => ({
                ...d,
                replies: [...d.replies, json],
                post: { ...d.post, repliesCount: d.post.repliesCount + 1 },
            }));
            setReply("");
        } catch (e) {
            setError(String(e?.message || e));
        } finally {
            setLoading(false);
        }
    };

    const canDelete = authUser && data?.post?.user && authUser._id === data.post.user._id;

    const deletePost = async () => {
        if (!canDelete) return;
        if (!confirm("Delete this post?")) return;
        setDeleting(true); setError("");
        try {
            const r = await fetch(`/api/posts/${id}`, { method: "DELETE", credentials: "include" });
            const json = await r.json();
            if (!r.ok) throw new Error(json?.message || "Delete failed");
            navigate("/forum");
        } catch (e) {
            setError(String(e?.message || e));
        } finally {
            setDeleting(false);
        }
    };

    if (error && !data) return <div className="container mx-auto p-6">Error: {error}</div>;
    if (!data) return <div className="container mx-auto p-6">Loading…</div>;

    const { post, replies } = data;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="mb-4"><Link to="/forum" className="link">← Back</Link></div>

            <div className="bg-base-200 rounded-lg p-5 border">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <div className="mt-1 text-xs opacity-70">
                    By {post.user?.fullName || "Unknown"} • {new Date(post.createdAt).toLocaleString()}
                </div>
                <p className="mt-4 whitespace-pre-wrap">{post.body}</p>

                <div className="mt-4">
                    {canDelete && (
                        <button className="btn btn-error btn-sm" onClick={deletePost} disabled={deleting}>
                            {deleting ? "Deleting…" : "Delete"}
                        </button>
                    )}
                </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">{post.repliesCount} Replies</h2>

            <div className="space-y-3">
                {replies.map((r) => (
                    <div key={r._id} className="bg-base-200 rounded-lg p-4 border">
                        <div className="text-sm opacity-80 flex items-center gap-2">
                            <span className="font-medium">{r.user?.fullName || "User"}</span>
                            <span>•</span>
                            <span>{new Date(r.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="mt-2 whitespace-pre-wrap">{r.body}</div>
                    </div>
                ))}
                {replies.length === 0 && <p className="opacity-70">No replies yet.</p>}
            </div>

            <div className="mt-6">
                {authUser ? (
                    <form onSubmit={sendReply} className="space-y-2">
                        <label className="block font-medium">Write a reply</label>
                        <textarea
                            className="textarea textarea-bordered w-full h-32"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                        />
                        <button className="btn btn-primary" disabled={loading}>
                            {loading ? "Posting…" : "Reply"}
                        </button>
                    </form>
                ) : (
                    <p className="opacity-80">
                        Please <Link className="link" to="/login">log in</Link> to reply.
                    </p>
                )}
            </div>
        </div>
    );
}
