import express from "express";
import {
    listPosts,
    getPost,
    createPost,
    deletePost,
    createReply,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"; // <-- named export

const router = express.Router();

// Public
router.get("/", listPosts);
router.get("/:id", getPost);

// Auth required
router.post("/", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/:id/replies", protectRoute, createReply);

export default router;
