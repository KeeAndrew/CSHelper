// Load env first
import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";

import { connectDB } from "./lib/db.js";

// routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import problemRoutes from "./routes/problem.route.js";
import judgeJavaRoutes from "./routes/judge.java.route.js";
import postRoutes from "./routes/post.route.js";
import aiRoutes from "./routes/ai.routes.js";

// socket exports the ONE app/server we use
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

// ensure uploads dir exists once
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// serve uploaded files (inline via /uploads/…)
app.use("/uploads", express.static(UPLOAD_DIR));

// force-download endpoint (Content-Disposition: attachment)
app.get("/api/files/:filename", (req, res) => {
  const file = path.join(UPLOAD_DIR, req.params.filename);
  if (!fs.existsSync(file)) return res.status(404).json({ message: "File not found" });
  res.download(file); // sets headers to trigger download
});

// health
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/judge-java", judgeJavaRoutes);
app.use("/api/ai", aiRoutes);

// static in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// start
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
