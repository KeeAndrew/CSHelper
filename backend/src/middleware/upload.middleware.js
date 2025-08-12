import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
    filename: (_req, file, cb) => {
        const ts = Date.now();
        const safe = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        cb(null, `${ts}-${safe}`);
    },
});

const ALLOWED = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
    "text/plain",
    "application/zip",
]);

function fileFilter(_req, file, cb) {
    if (ALLOWED.has(file.mimetype)) return cb(null, true);
    cb(new Error("Unsupported file type"), false);
}

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024, files: 5 }, // 10MB each, up to 5
});
