export function downloadFromUploadsUrl(url) {
    try {
        // only auto-download local uploads (avoid cross-origin)
        if (!url || !url.startsWith("/uploads/")) return;
        const filename = url.split("/").pop();
        const a = document.createElement("a");
        a.href = `/api/files/${filename}`; // forces attachment download
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => document.body.removeChild(a), 0);
    } catch {
        // ignore
    }
}
