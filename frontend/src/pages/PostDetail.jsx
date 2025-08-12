import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { downloadFromUploadsUrl } from "../lib/downloadFile";

const AUTO_DL_KEY = "forum.autoDL";

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser } = useAuthStore();

    const [data, setData] = useState(null); // { post, replies }
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [reply, setReply] = useState("");
    const [replyFiles, setReplyFiles] = useState([]);

    const [autoDL, setAutoDL] = useState(() => {
        try { return JSON.parse(localStorage.getItem(AUTO_DL_KEY) || "false"); }
        catch { return false; }
    });
    useEffect(() => {
        localStorage.setItem(AUTO_DL_KEY, JSON.stringify(autoDL));
    }, [autoDL]);

    // Track already-downloaded URLs so we don't duplicate
    const [downloaded, setDownloaded] = useState(() => new Set());

    useEffect(() => {
        let mounted = true;
        setError(""); setData(null);
        fetch(`/api/posts/${id}`, { cache: "no-store", credentials: "include" })
            .then(async (r) => {
                if (!r.ok) throw new Error(`GET /api/posts/${id} -> ${r.status}`);
                return r.json();
            })
            .then((json) => mounted && setData(json))
            .catch((e) => setError(String(e?.message || e)));
        return () => { mounted = false; };
    }, [id]);

    // Auto-download on load and whenever data changes (dedup by Set)
    useEffect(() => {
        if (!autoDL || !data) return;
        const urls = [];

        if (Array.isArray(data.post?.attachments)) {
            data.post.attachments.forEach((f) => urls.push(f.url));
        }
        if (Array.isArray(data.replies)) {
            data.replies.forEach((r) => r.attachments?.forEach((f) => urls.push(f.url)));
        }

        if (urls.length === 0) return;

        setDownloaded((prev) => {
            const next = new Set(prev);
            urls.forEach((u) => {
                if (u && !next.has(u)) {
                    downloadFromUploadsUrl(u);
                    next.add(u);
                }
            });
            return next;
        });
    }, [autoDL, data]);

    const canDelete = useMemo(() => {
        return authUser && data?.post?.user && authUser._id === data.post.user._id;
    }, [authUser, data]);

    const sendReply = async (e) => {
        e.preventDefault();
        if (!reply.trim() && replyFiles.length === 0) return;
        setLoading(true); setError("");
        try {
            const fd = new FormData();
            if (reply.trim()) fd.append("body", reply.trim());
            replyFiles.forEach((f) => fd.append("files", f));
            const r = await fetch(`/api/posts/${id}/replies`, {
                method: "POST",
                credentials: "include",
                body: fd,
            });
            const json = await r.json();
            if (!r.ok) throw new Error(json?.message || "Failed to reply");
            setData((d) => ({
                ...d,
                replies: [...d.replies, json],
                post: { ...d.post, repliesCount: (d.post.repliesCount || 0) + 1 },
            }));
            setReply(""); setReplyFiles([]);
            // if autoDL on, grab any new attachments from this reply (Set dedups)
            if (autoDL && Array.isArray(json.attachments)) {
                setDownloaded((prev) => {
                    const next = new Set(prev);
                    json.attachments.forEach((f) => {
                        if (f?.url && !next.has(f.url)) {
                            downloadFromUploadsUrl(f.url);
                            next.add(f.url);
                        }
                    });
                    return next;
                });
            }
        } catch (e2) {
            setError(String(e2?.message || e2));
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async () => {
        if (!canDelete) return;
        if (!confirm("Delete this post?")) return;
        setDeleting(true); setError("");
        try {
            const r = await fetch(`/api/posts/${id}`, { method: "DELETE", credentials: "include" });
            const json = await r.json();
            if (!r.ok) throw new Error(json?.message || "Delete failed");
            navigate("/forum");
        } catch (e2) {
            setError(String(e2?.message || e2));
        } finally {
            setDeleting(false);
        }
    };

    if (error && !data) return <div className="container mx-auto p-6 pt-20">Error: {error}</div>;
    if (!data) return <div className="container mx-auto p-6 pt-20">Loading…</div>;

    const { post, replies } = data;

    return (
        <div className="container mx-auto p-6 pt-20 max-w-4xl">
            <div className="mb-4 flex items-center justify-between">
                <Link to="/forum" className="link">← Back</Link>
                <label className="flex items-center gap-2 text-sm opacity-80">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={autoDL}
                        onChange={(e) => setAutoDL(e.target.checked)}
                    />
                    Auto-download attachments
                </label>
            </div>

            <div className="bg-base-200 rounded-lg p-5 border">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <div className="mt-1 text-xs opacity-70">
                    By {post.user?.fullName || "Unknown"} • {new Date(post.createdAt).toLocaleString()}
                </div>

                <p className="mt-4 whitespace-pre-wrap">{post.body}</p>

                {Array.isArray(post.attachments) && post.attachments.length > 0 && (
                    <div className="mt-4 grid sm:grid-cols-2 gap-3">
                        {post.attachments.map((f, i) => <AttachmentCard key={i} file={f} />)}
                    </div>
                )}

                {canDelete && (
                    <div className="mt-4">
                        <button className="btn btn-error btn-sm" onClick={deletePost} disabled={deleting}>
                            {deleting ? "Deleting…" : "Delete"}
                        </button>
                    </div>
                )}
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

                        {r.attachments?.length > 0 && (
                            <div className="mt-3 grid sm:grid-cols-2 gap-3">
                                {r.attachments.map((f, j) => <AttachmentCard key={j} file={f} />)}
                            </div>
                        )}
                    </div>
                ))}
                {replies.length === 0 && <p className="opacity-70">No replies yet.</p>}
            </div>

            <div className="mt-6">
                {authUser ? (
                    <form onSubmit={sendReply} className="space-y-3">
                        <label className="block font-medium">Write a reply</label>
                        <textarea
                            className="textarea textarea-bordered w-full h-32"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                        />
                        <div>
                            <label className="block mb-1 font-medium">Attachments (optional)</label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setReplyFiles(Array.from(e.target.files || []))}
                                className="file-input file-input-bordered w-full max-w-md"
                                accept=".png,.jpg,.jpeg,.gif,.webp,.pdf,.txt,.zip"
                            />
                        </div>
                        <button className="btn btn-primary" disabled={loading}>
                            {loading ? "Posting…" : "Reply"}
                        </button>
                        {error && <p className="text-error">{error}</p>}
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

function AttachmentCard({ file }) {
    const isImage = (file?.mimetype || "").startsWith("image/");
    const name = file?.filename || file?.url?.split("/")?.slice(-1)[0] || "file";
    const href = file?.url || "#";
    const isLocal = href.startsWith("/uploads/");

    return (
        <a
            href={isLocal ? `/api/files/${name}` : href}
            target="_blank"
            rel="noreferrer"
            className="block border rounded-lg overflow-hidden bg-base-100 hover:opacity-90"
            title={name}
        >
            {isImage && isLocal ? (
                <img src={href} alt={name} className="w-full h-40 object-cover" />
            ) : isImage ? (
                <img src={href} alt={name} className="w-full h-40 object-cover" />
            ) : (
                <div className="p-3 text-sm">
                    {name} <span className="opacity-60">({file.mimetype || "file"})</span>
                </div>
            )}
        </a>
    );
}
