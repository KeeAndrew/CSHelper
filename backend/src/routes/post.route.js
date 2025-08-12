import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import {
    listPosts,
    getPost,
    createPost,
    deletePost,
    createReply,
} from "../controllers/post.controller.js";

const router = express.Router();

// Public
router.get("/", listPosts);
router.get("/:id", getPost);

// Auth + files  (field name MUST be "files")
router.post("/", protectRoute, upload.array("files", 5), createPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/:id/replies", protectRoute, upload.array("files", 5), createReply);

export default router;
