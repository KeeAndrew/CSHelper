// ✅ Load env FIRST so any module that reads process.env sees values
import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";

// routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import problemRoutes from "./routes/problem.route.js";
import judgeJavaRoutes from "./routes/judge.java.route.js";
import postRoutes from "./routes/post.route.js";    // use the filename you actually created
import aiRoutes from "./routes/ai.routes.js";

// socket exports the ONE app/server we use everywhere
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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// health (handy for quick checks)
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/judge-java", judgeJavaRoutes);
app.use("/api/ai", aiRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// static in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// start server
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
