// frontend/src/components/MessageInput.jsx
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Paperclip, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file

export default function MessageInput() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]); // File[]
  const [previews, setPreviews] = useState([]); // { idx,url,name,type,size }[]
  const [sending, setSending] = useState(false);

  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const onPickFilesClick = () => fileInputRef.current?.click();

  const onFilesChosen = (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;

    const next = [...files];
    for (const f of picked) {
      if (next.length >= MAX_FILES) {
        toast.error(`You can attach up to ${MAX_FILES} files`);
        break;
      }
      if (f.size > MAX_FILE_SIZE) {
        toast.error(`${f.name} is larger than 10MB`);
        continue;
      }
      next.push(f);
    }
    setFiles(next);

    // build previews (revoke old)
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews(
      next.map((f, idx) => ({
        idx,
        url: URL.createObjectURL(f),
        name: f.name,
        type: f.type,
        size: f.size,
      }))
    );

    // allow re-selecting same file(s)
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (idx) => {
    const nextFiles = files.filter((_, i) => i !== idx);
    setFiles(nextFiles);

    const nextPreviews = previews.filter((p) => p.idx !== idx);
    // revoke removed preview URL
    const removed = previews.find((p) => p.idx === idx);
    if (removed) URL.revokeObjectURL(removed.url);
    // reindex
    setPreviews(nextPreviews.map((p, i) => ({ ...p, idx: i })));
  };

  const clearAll = () => {
    setText("");
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setFiles([]);
    setPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && files.length === 0) return;

    setSending(true);
    try {
      await sendMessage({ text: text.trim(), files });
      clearAll();
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(error?.message || "Failed to send");
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

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* hidden file input (images + docs) */}
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
            className="hidden sm:flex btn btn-circle text-zinc-400"
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
