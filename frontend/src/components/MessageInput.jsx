import { useRef, useState, useMemo } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Paperclip, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function MessageInput() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);               // File[]
  const [previews, setPreviews] = useState([]);         // { url, name, type, size, idx }
  const [sending, setSending] = useState(false);

  const fileInputRef = useRef(null);

  // Read the current recipient from your chat store
  const { selectedUser, selectedConversation } = useChatStore(); // adjust if your store uses different keys
  const recipientId = useMemo(
    () => selectedUser?._id || selectedConversation?._id || null,
    [selectedUser, selectedConversation]
  );

  const onPickFilesClick = () => fileInputRef.current?.click();

  const onFilesChosen = (e) => {
    const list = Array.from(e.target.files || []);
    if (!list.length) return;

    const current = [...files];
    for (const f of list) {
      if (current.length >= MAX_FILES) {
        toast.error(`You can attach up to ${MAX_FILES} files`);
        break;
      }
      if (f.size > MAX_FILE_SIZE) {
        toast.error(`${f.name} is larger than 10MB`);
        continue;
      }
      current.push(f);
    }
    setFiles(current);

    // make previews (revoke old ones)
    setPreviews((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return current.map((f, idx) => ({
        idx,
        url: URL.createObjectURL(f),
        name: f.name,
        type: f.type,
        size: f.size,
      }));
    });

    // reset input so picking the same file again works
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (idx) => {
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
    setPreviews((prev) => {
      const toRemove = prev.find((p) => p.idx === idx);
      if (toRemove) URL.revokeObjectURL(toRemove.url);
      const remapped = prev.filter((p) => p.idx !== idx);
      // reindex to keep idx aligned with files order
      return remapped.map((p, i) => ({ ...p, idx: i }));
    });
  };

  const clearAll = () => {
    setText("");
    files.forEach((_f, i) => {
      const p = previews.find((pp) => pp.idx === i);
      if (p) URL.revokeObjectURL(p.url);
    });
    setFiles([]);
    setPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!recipientId) {
      toast.error("No active conversation selected.");
      return;
    }
    if (!text.trim() && files.length === 0) return;

    setSending(true);
    try {
      const fd = new FormData();
      if (text.trim()) fd.append("text", text.trim());
      fd.append("recipientId", recipientId);
      files.forEach((f) => fd.append("files", f));

      // If your API path is /api/messages/:id, use:
      // const res = await fetch(`/api/messages/${recipientId}`, { method: "POST", credentials: "include", body: fd });
      const res = await fetch("/api/messages", {
        method: "POST",
        credentials: "include",
        body: fd, // do NOT set Content-Type; browser sets multipart boundary
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to send message");

      // If your UI doesn't update via socket automatically, you can push `data` into your store here.
      // Example (only if your store has an addMessage action):
      // useChatStore.getState().addMessage?.(data);

      clearAll();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to send");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-4 w-full">
      {/* attachment previews */}
      {previews.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-3">
          {previews.map((p) => {
            const isImage = (p.type || "").startsWith("image/");
            return (
              <div key={p.idx} className="relative">
                {isImage ? (
                  <img
                    src={p.url}
                    alt={p.name}
                    className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                  />
                ) : (
                  <div className="w-44 rounded-lg border border-zinc-700 bg-base-200 p-2 text-xs">
                    <div className="truncate font-medium">{p.name}</div>
                    <div className="opacity-70">{Math.ceil(p.size / 1024)} KB</div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeFile(p.idx)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                  title="Remove"
                >
                  <X className="size-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <form onSubmit={handleSend} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* hidden file input */}
          <input
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.gif,.webp,.pdf,.txt,.zip"
            className="hidden"
            ref={fileInputRef}
            onChange={onFilesChosen}
          />

          {/* attach buttons */}
          <button
            type="button"
            className="hidden sm:flex btn btn-circle text-zinc-400"
            onClick={onPickFilesClick}
            title="Attach files"
          >
            <Paperclip size={20} />
          </button>
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${previews.some(p => (p.type || "").startsWith("image/")) ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={onPickFilesClick}
            title="Attach images"
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={sending || (!text.trim() && files.length === 0)}
          title="Send"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}
