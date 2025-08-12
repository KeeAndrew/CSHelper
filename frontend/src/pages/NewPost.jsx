import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onFileChange = (e) => setFiles(Array.from(e.target.files || []));

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const fd = new FormData();
            fd.append("title", title);
            fd.append("body", body);
            files.forEach((f) => fd.append("files", f));

            const r = await fetch("/api/posts", {
                method: "POST",
                credentials: "include",
                body: fd,
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data?.message || "Failed to create post");
            navigate(`/forum/${data._id}`);
        } catch (e2) {
            setError(String(e2?.message || e2));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 pt-20 max-w-3xl">
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

                <div>
                    <label className="block mb-1 font-medium">Attachments (optional)</label>
                    <input
                        type="file"
                        multiple
                        onChange={onFileChange}
                        className="file-input file-input-bordered w-full max-w-md"
                        accept=".png,.jpg,.jpeg,.gif,.webp,.pdf,.txt,.zip"
                    />
                    {files.length > 0 && (
                        <ul className="mt-2 text-sm opacity-80 list-disc pl-5">
                            {files.map((f) => (
                                <li key={f.name}>
                                    {f.name} <span className="opacity-60">({Math.ceil(f.size / 1024)} KB)</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Posting…" : "Submit"}
                </button>
            </form>
        </div>
    );
}
